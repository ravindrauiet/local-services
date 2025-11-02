'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  StarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  HandThumbUpIcon,
  UserGroupIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp, doc, getDoc, updateDoc, serverTimestamp, limit, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import Footer from '@/components/Footer';

interface Booking {
  id: string;
  userId: string;
  providerId: string;
  assignedProviderId?: string;
  assignmentStatus?: 'pending' | 'accepted' | 'rejected';
  providerAvailability?: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceDate: string;
  serviceTime: string;
  location: string;
  address: string;
  additionalNotes?: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  customerData?: {
    name: string;
    phone: string;
    email?: string;
  };
}

interface ProviderData {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  rating: number;
  totalReviews: number;
  totalBookings: number;
  isApproved: boolean;
  isActive: boolean;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircleIcon },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: ArrowPathIcon },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIconSolid },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
};

export default function ProviderDashboardPage() {
  const { profile, user, isLoading: authLoading } = useUserAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingBooking, setUpdatingBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!profile || !user) {
        router.push('/login');
        return;
      }
      // Don't redirect if role is not provider yet - we'll check for provider document in loadData
      // If they have a provider document, we'll update their role automatically
    }
  }, [profile, user, authLoading, router]);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      // Check if user has provider document (even if role is not set)
      setLoading(true);
      setError('');
      
      try {
        // Load provider data by ownerId (since provider documents use ownerId field)
        const providerQuery = query(
          collection(db, 'providers'),
          where('ownerId', '==', user.uid),
          limit(1)
        );
        
        const providerSnapshot = await getDocs(providerQuery);
        
        if (!providerSnapshot.empty) {
          const providerDoc = providerSnapshot.docs[0];
          const data = providerDoc.data();
          
          // If user role is not set to provider, but they have a provider document, update it
          if (profile?.role !== 'provider') {
            try {
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, { role: 'provider' });
              // Force profile refresh by reloading page or updating context
              window.location.reload();
            } catch (err) {
              console.error('Error updating user role:', err);
            }
          }
          
          setProviderData({
            id: providerDoc.id,
            name: data.name || '',
            businessName: data.businessName || '',
            serviceType: data.serviceType || '',
            rating: data.rating || 0,
            totalReviews: data.totalReviews || 0,
            totalBookings: data.totalBookings || 0,
            isApproved: data.isApproved || false,
            isActive: data.isActive || false,
          });

          // Load bookings for this provider
          // Provider should see bookings where:
          // 1. assignedProviderId matches (admin assigned)
          // 2. providerId matches (old direct booking system)
          
          // Query by assignedProviderId (new system - admin assigns)
          let assignedBookingsQuery = query(
            collection(db, 'bookings'),
            where('assignedProviderId', '==', providerDoc.id)
          );
          
          // Query by providerId (old system - direct booking)
          let directBookingsQuery = query(
            collection(db, 'bookings'),
            where('providerId', '==', providerDoc.id)
          );
          
          // Try to add orderBy, but handle if index doesn't exist
          try {
            assignedBookingsQuery = query(assignedBookingsQuery, orderBy('createdAt', 'desc'));
            directBookingsQuery = query(directBookingsQuery, orderBy('createdAt', 'desc'));
          } catch (err) {
            console.warn('OrderBy index might not exist, continuing without sorting:', err);
          }
          
          // Fetch both queries
          const [assignedSnapshot, directSnapshot] = await Promise.all([
            getDocs(assignedBookingsQuery),
            getDocs(directBookingsQuery)
          ]);
          
          // Combine both results and remove duplicates
          const allBookingDocs = new Map();
          
          assignedSnapshot.docs.forEach(doc => {
            allBookingDocs.set(doc.id, doc);
          });
          
          directSnapshot.docs.forEach(doc => {
            allBookingDocs.set(doc.id, doc);
          });
          
          type QuerySnapshotLike = {
            docs: QueryDocumentSnapshot<DocumentData>[];
            empty: boolean;
            size: number;
          };
          const finalSnapshot: QuerySnapshotLike = {
            docs: Array.from(allBookingDocs.values()),
            empty: allBookingDocs.size === 0,
            size: allBookingDocs.size
          };
          const bookingsData: Booking[] = [];
          
          for (const docSnap of finalSnapshot.docs) {
            const data = docSnap.data();
            let customerData = null;
            
            // Fetch customer details if userId exists
            if (data.userId) {
              try {
                const customerDoc = await getDoc(doc(db, 'users', data.userId));
                if (customerDoc.exists()) {
                  const customer = customerDoc.data();
                  customerData = {
                    name: customer.name || data.customerName || '',
                    phone: customer.phone || data.customerPhone || '',
                    email: customer.email || data.customerEmail || ''
                  };
                }
              } catch (err) {
                console.error('Error loading customer:', err);
              }
            }
            
            bookingsData.push({
              id: docSnap.id,
              ...data,
              createdAt: data.createdAt || Timestamp.now(),
              updatedAt: data.updatedAt || Timestamp.now(),
              customerData: customerData || undefined
            } as Booking);
          }
          
          setBookings(bookingsData);
        } else {
          // No provider document found - redirect to registration
          if (profile?.role !== 'provider') {
            router.push('/provider/register');
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadData();
    }
  }, [user, profile, router]);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingBooking(bookingId);
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: newStatus as 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled', updatedAt: Timestamp.now() } : b
      ));
    } catch (err) {
      console.error('Error updating booking:', err);
      alert('Failed to update booking status. Please try again.');
    } finally {
      setUpdatingBooking(null);
    }
  };

  if (authLoading || loading && bookings.length === 0 && !providerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show dashboard even if role is not set yet - we're loading provider data
  if (!user) {
    return null;
  }
  
  // If no provider document found, show a message (we'll redirect in useEffect)
  if (!providerData && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No provider profile found. Please register as a provider.</p>
          <Link
            href="/provider/register"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Register as Provider
          </Link>
        </div>
      </div>
    );
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = 
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'accepted' || b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings
      .filter(b => b.status === 'completed' && b.totalAmount)
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    monthlyRevenue: bookings
      .filter(b => {
        if (b.status !== 'completed' || !b.totalAmount) return false;
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return b.createdAt.toDate() >= thirtyDaysAgo;
      })
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString || 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Provider Dashboard</h1>
              <p className="text-green-100">Welcome, {providerData?.businessName || profile?.name || 'Provider'}</p>
              {providerData && (
                <div className="flex items-center gap-4 mt-2">
                  {providerData.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">{providerData.rating.toFixed(1)}</span>
                      <span className="text-green-100">({providerData.totalReviews} reviews)</span>
                    </div>
                  )}
                  {!providerData.isApproved && (
                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                      Pending Approval
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Link
                href={`/providers/${user?.uid}`}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                View Public Profile
              </Link>
              <Link
                href="/profile"
                className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Manage Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ClipboardDocumentListIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ArrowPathIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircleIconSolid className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <ClipboardDocumentListIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              {bookings.length === 0 
                ? "You don't have any bookings yet. Bookings will appear here once admin assigns them to you from pending customer requests."
                : "No bookings match your current filters."}
            </p>
            {bookings.length === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto text-left">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong><br />
                  1. Customer creates a booking request<br />
                  2. Admin reviews and assigns it to you<br />
                  3. You receive notification and can accept/reject<br />
                  4. Accepted bookings appear here
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              const isLoading = updatingBooking === booking.id;
              
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Booking Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{booking.serviceType}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[booking.status].color}`}>
                              <StatusIcon className="h-3 w-3 inline mr-1" />
                              {statusConfig[booking.status].label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <UserIcon className="h-4 w-4 text-gray-400" />
                            <span>{booking.customerName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatDate(booking.serviceDate)}</div>
                            <div className="text-xs text-gray-500">Service Date</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <ClockIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatTime(booking.serviceTime)}</div>
                            <div className="text-xs text-gray-500">Service Time</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.location}</div>
                            <div className="text-xs text-gray-500">Location</div>
                          </div>
                        </div>
                        {booking.totalAmount && (
                          <div className="flex items-center gap-3 text-gray-600">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">₹{booking.totalAmount.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Amount</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {booking.additionalNotes && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Customer Notes: </span>
                            {booking.additionalNotes}
                          </p>
                        </div>
                      )}

                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Contact</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {booking.customerPhone && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <PhoneIcon className="h-4 w-4" />
                              <a href={`tel:${booking.customerPhone}`} className="hover:text-green-600">
                                {booking.customerPhone}
                              </a>
                            </div>
                          )}
                          {booking.customerEmail && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <EnvelopeIcon className="h-4 w-4" />
                              <a href={`mailto:${booking.customerEmail}`} className="hover:text-green-600">
                                {booking.customerEmail}
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <MapPinIcon className="h-3 w-3 inline mr-1" />
                          {booking.address}
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:w-64 flex flex-col gap-3">
                      <div className="text-xs text-gray-500 mb-2">
                        <div>Received: {booking.createdAt.toDate().toLocaleDateString()}</div>
                        {booking.status === 'completed' && (
                          <div className="mt-1">Completed: {booking.updatedAt.toDate().toLocaleDateString()}</div>
                        )}
                      </div>
                      
                      {/* Action Buttons based on assignment status */}
                      {booking.assignmentStatus === 'pending' && (
                        <div className="flex flex-col gap-2">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2">
                            <p className="text-xs text-yellow-800 font-semibold mb-2">Admin Assigned - Accept/Reject</p>
                            <input
                              type="text"
                              id={`availability-${booking.id}`}
                              placeholder="Your availability time (e.g., 10 AM - 2 PM)"
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={async () => {
                              const availabilityInput = document.getElementById(`availability-${booking.id}`) as HTMLInputElement;
                              const availability = availabilityInput?.value || '';
                              
                              if (!availability) {
                                alert('Please enter your availability time');
                                return;
                              }
                              
                              setUpdatingBooking(booking.id);
                              try {
                                const res = await fetch('/api/provider/bookings/accept', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ 
                                    bookingId: booking.id, 
                                    accept: true,
                                    providerAvailability: availability 
                                  }),
                                });
                                
                                if (!res.ok) throw new Error('Failed to accept booking');
                                const json = await res.json();
                                
                                if (!json.success) throw new Error(json.error || 'Failed to accept booking');
                                
                                // Update local state
                                setBookings(prev => prev.map(b => 
                                  b.id === booking.id 
                                    ? { ...b, assignmentStatus: 'accepted', providerAvailability: availability, status: 'accepted' }
                                    : b
                                ));
                                
                                alert('Booking accepted! Admin and customer have been notified.');
                              } catch (err) {
                                console.error('Error accepting booking:', err);
                                alert(err instanceof Error ? err.message : 'Failed to accept booking');
                              } finally {
                                setUpdatingBooking(null);
                              }
                            }}
                            disabled={updatingBooking === booking.id}
                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {updatingBooking === booking.id ? (
                              <>
                                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                                Accepting...
                              </>
                            ) : (
                              <>
                                <HandThumbUpIcon className="h-4 w-4" />
                                Accept Assignment
                              </>
                            )}
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Are you sure you want to reject this assignment?')) {
                                setUpdatingBooking(booking.id);
                                try {
                                  const res = await fetch('/api/provider/bookings/accept', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ bookingId: booking.id, accept: false }),
                                  });
                                  
                                  if (!res.ok) throw new Error('Failed to reject booking');
                                  const json = await res.json();
                                  
                                  if (!json.success) throw new Error(json.error || 'Failed to reject booking');
                                  
                                  // Update local state
                                  setBookings(prev => prev.map(b => 
                                    b.id === booking.id 
                                      ? { ...b, assignmentStatus: 'rejected' }
                                      : b
                                  ));
                                  
                                  alert('Assignment rejected. Admin will be notified.');
                                } catch (err) {
                                  console.error('Error rejecting booking:', err);
                                  alert(err instanceof Error ? err.message : 'Failed to reject booking');
                                } finally {
                                  setUpdatingBooking(null);
                                }
                              }
                            }}
                            disabled={updatingBooking === booking.id}
                            className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            Reject Assignment
                          </button>
                        </div>
                      )}
                      
                      {booking.assignmentStatus === 'accepted' && booking.status === 'pending' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                          <p className="text-sm text-green-800 font-semibold">✓ Assignment Accepted</p>
                          {booking.providerAvailability && (
                            <p className="text-xs text-green-600 mt-1">Your availability: {booking.providerAvailability}</p>
                          )}
                          <button
                            onClick={() => handleUpdateBookingStatus(booking.id, 'accepted')}
                            disabled={isLoading}
                            className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            Confirm Ready
                          </button>
                        </div>
                      )}
                      
                      {/* Old pending status handling for backward compatibility */}
                      {!booking.assignmentStatus && booking.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleUpdateBookingStatus(booking.id, 'accepted')}
                            disabled={isLoading}
                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {isLoading ? (
                              <>
                                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <HandThumbUpIcon className="h-4 w-4" />
                                Accept Booking
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to decline this booking?')) {
                                handleUpdateBookingStatus(booking.id, 'cancelled');
                              }
                            }}
                            disabled={isLoading}
                            className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      
                      {booking.status === 'accepted' && (
                        <button
                          onClick={() => handleUpdateBookingStatus(booking.id, 'in-progress')}
                          disabled={isLoading}
                          className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <ArrowPathIcon className="h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <TruckIcon className="h-4 w-4" />
                              Start Service
                            </>
                          )}
                        </button>
                      )}
                      
                      {booking.status === 'in-progress' && (
                        <button
                          onClick={() => {
                            const amount = prompt('Enter the total amount for this service (₹):');
                            if (amount && !isNaN(Number(amount))) {
                              handleUpdateBookingStatus(booking.id, 'completed');
                              // TODO: Update booking with totalAmount
                            } else if (amount !== null) {
                              alert('Please enter a valid amount');
                            }
                          }}
                          disabled={isLoading}
                          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <ArrowPathIcon className="h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="h-4 w-4" />
                              Mark Complete
                            </>
                          )}
                        </button>
                      )}
                      
                      {booking.status === 'completed' && (
                        <div className="text-center text-sm text-green-600 font-semibold">
                          ✓ Service Completed
                        </div>
                      )}
                      
                      {(booking.status === 'pending' || booking.status === 'accepted' || booking.status === 'in-progress') && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to cancel this booking?')) {
                              handleUpdateBookingStatus(booking.id, 'cancelled');
                            }
                          }}
                          disabled={isLoading}
                          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}


