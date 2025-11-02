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
  SparklesIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  TruckIcon,
  BuildingOfficeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
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
  assignedProviderName?: string;
  providerData?: {
    name: string;
    businessName?: string;
    phone: string;
    email: string;
    rating: number;
    photo?: string;
  };
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircleIcon },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: ArrowPathIcon },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIconSolid },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
};

export default function CustomerDashboard() {
  const { profile, user, isLoading: authLoading } = useUserAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!profile || !user) {
        router.push('/login');
        return;
      }
      if (profile.role === 'provider') {
        router.push('/provider/dashboard');
        return;
      }
    }
  }, [profile, user, authLoading, router]);

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return;
      
      setLoading(true);
      setError('');
      
      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(bookingsQuery);
        const bookingsData: Booking[] = [];
        
        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          let providerData = null;
          
          // Fetch provider details if assignedProviderId exists (new system) or providerId (old system)
          const providerIdToFetch = data.assignedProviderId || data.providerId;
          if (providerIdToFetch) {
            try {
              const providerDoc = await getDoc(doc(db, 'providers', providerIdToFetch));
              if (providerDoc.exists()) {
                const provider = providerDoc.data();
                providerData = {
                  name: provider.name || '',
                  businessName: provider.businessName || '',
                  phone: provider.phone || '',
                  email: provider.email || '',
                  rating: provider.rating || 0,
                  photo: provider.photo || ''
                };
              }
            } catch (err) {
              console.error('Error loading provider:', err);
            }
          }
          
          bookingsData.push({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt || Timestamp.now(),
            updatedAt: data.updatedAt || Timestamp.now(),
            assignedProviderName: data.assignedProviderName || providerData?.name || providerData?.businessName,
            providerData: providerData || undefined
          } as Booking);
        }
        
        setBookings(bookingsData);
      } catch (err) {
        console.error('Error loading bookings:', err);
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user && profile?.role !== 'provider') {
      loadBookings();
    }
  }, [user, profile]);

  if (authLoading || loading && bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile || profile.role === 'provider') {
    return null;
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch =
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.assignedProviderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerData?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    totalSpent: bookings
      .filter(b => b.status === 'completed' && b.totalAmount)
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
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
              <p className="text-blue-100">Welcome back, {profile.name}</p>
            </div>
            <Link
              href="/book"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book New Service
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
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
              <XCircleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <CurrencyDollarIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{stats.totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Spent</div>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                ? "You haven't made any bookings yet. Book your first service now!"
                : "No bookings match your current filters."}
            </p>
            {bookings.length === 0 && (
              <Link
                href="/book"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Book a Service
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section - Service Info */}
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
                          {booking.providerData && (
                            <div className="flex items-center gap-2 mb-2">
                              <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {booking.providerData.businessName || booking.providerData.name}
                              </span>
                              {booking.providerData.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <StarIconSolid className="h-4 w-4 text-yellow-400" />
                                  <span className="text-sm text-gray-600">{booking.providerData.rating.toFixed(1)}</span>
                                </div>
                              )}
                            </div>
                          )}
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
                            <span className="font-medium">Notes: </span>
                            {booking.additionalNotes}
                          </p>
                        </div>
                      )}

                      {/* Show Assigned Provider Info (without phone) */}
                      {booking.assignedProviderName && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Assigned Provider</h4>
                          <div className="text-sm text-gray-700">
                            <div className="font-medium mb-1">{booking.assignedProviderName}</div>
                            {booking.assignmentStatus === 'pending' && (
                              <div className="text-yellow-600 text-xs">Provider is reviewing your request...</div>
                            )}
                            {booking.assignmentStatus === 'accepted' && booking.providerAvailability && (
                              <div className="text-green-600 text-xs mt-1">
                                ✓ Provider confirmed • Available: {booking.providerAvailability}
                              </div>
                            )}
                            {booking.assignmentStatus === 'rejected' && (
                              <div className="text-red-600 text-xs">Provider declined. Admin will assign another provider.</div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Fallback for old bookings without assignment */}
                      {!booking.assignedProviderName && booking.providerData && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Service Provider</h4>
                          <div className="text-sm text-gray-700">
                            <div className="font-medium">{booking.providerData.businessName || booking.providerData.name}</div>
                            {booking.providerData.rating > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <StarIconSolid className="h-4 w-4 text-yellow-400" />
                                <span className="text-xs text-gray-600">{booking.providerData.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:w-48 flex flex-col gap-3">
                      <div className="text-xs text-gray-500 mb-2">
                        <div>Booked: {booking.createdAt.toDate().toLocaleDateString()}</div>
                        {booking.status === 'completed' && (
                          <div className="mt-1">Completed: {booking.updatedAt.toDate().toLocaleDateString()}</div>
                        )}
                      </div>
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <EyeIcon className="h-4 w-4" />
                        View Details
                      </Link>
                      {(booking.status === 'pending' || booking.status === 'accepted') && (
                        <button
                          onClick={async () => {
                            if (confirm('Are you sure you want to cancel this booking?')) {
                              // TODO: Implement cancel booking
                              alert('Cancel booking functionality will be implemented');
                            }
                          }}
                          className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                      {booking.status === 'completed' && (
                        <Link
                          href={`/providers/${booking.providerId}`}
                          className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors text-center"
                        >
                          Review Provider
                        </Link>
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

