'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp, collection, query, where, getDocs, limit } from 'firebase/firestore';
import Footer from '@/components/Footer';

interface Booking {
  id: string;
  userId: string;
  providerId?: string;
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
    rating: number;
  };
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: ClockIcon },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircleIcon },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: ArrowPathIcon },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircleIconSolid },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircleIcon },
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { profile, user } = useUserAuth();
  const bookingId = params?.id as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooking = async () => {
      if (!bookingId) return;
      
      setLoading(true);
      setError('');
      
      try {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingSnap = await getDoc(bookingRef);
        
        if (!bookingSnap.exists()) {
          setError('Booking not found');
          setLoading(false);
          return;
        }
        
        const data = bookingSnap.data();
        
        // Load provider data if assignedProviderId exists
        let providerData = null;
        const providerIdToFetch = data.assignedProviderId || data.providerId;
        if (providerIdToFetch) {
          try {
            const providerDoc = await getDoc(doc(db, 'providers', providerIdToFetch));
            if (providerDoc.exists()) {
              const provider = providerDoc.data();
              providerData = {
                name: provider.name || '',
                businessName: provider.businessName || '',
                rating: provider.rating || 0,
              };
            }
          } catch (err) {
            console.error('Error loading provider:', err);
          }
        }
        
        // Check if user has permission to view this booking
        if (user && profile) {
          const userId = user.uid;
          const userRole = profile.role;
          
          // Get current provider's document ID if user is provider
          let currentProviderDocId = null;
          if (userRole === 'provider') {
            try {
              // Find provider document by ownerId
              const providerQuery = query(
                collection(db, 'providers'),
                where('ownerId', '==', userId),
                limit(1)
              );
              const providerSnap = await getDocs(providerQuery);
              if (!providerSnap.empty) {
                currentProviderDocId = providerSnap.docs[0].id;
              }
            } catch (err) {
              console.error('Error checking provider:', err);
            }
          }
          
          // User can view if: they own it, or they're admin, or they're the assigned provider
          const canView = 
            data.userId === userId || 
            userRole === 'admin' ||
            (userRole === 'provider' && currentProviderDocId && 
             (data.assignedProviderId === currentProviderDocId || data.providerId === currentProviderDocId));
          
          if (!canView) {
            setError('You do not have permission to view this booking');
            setLoading(false);
            return;
          }
        } else if (!user) {
          // Guest users cannot view booking details
          router.push('/login');
          return;
        }
        
        setBooking({
          id: bookingSnap.id,
          ...data,
          createdAt: data.createdAt || Timestamp.now(),
          updatedAt: data.updatedAt || Timestamp.now(),
          assignedProviderName: data.assignedProviderName || providerData?.name || providerData?.businessName,
          providerData: providerData || undefined
        } as Booking);
      } catch (err) {
        console.error('Error loading booking:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId, user, profile, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The booking you are looking for does not exist.'}</p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[booking.status].icon;
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative text-white">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Details</h1>
              <p className="text-blue-100">Booking ID: {booking.id.substring(0, 8)}...</p>
            </div>
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${statusConfig[booking.status].color} bg-white/10 backdrop-blur-sm`}>
              <StatusIcon className="h-4 w-4 inline mr-1" />
              {statusConfig[booking.status].label}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Booking Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{booking.serviceType}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Service Date</div>
                    <div className="font-medium text-gray-900">{formatDate(booking.serviceDate)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Service Time</div>
                    <div className="font-medium text-gray-900">{booking.serviceTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-medium text-gray-900">{booking.location}</div>
                    <div className="text-sm text-gray-600">{booking.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium text-gray-900">{booking.customerName}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-900">{booking.customerPhone}</div>
                  </div>
                </div>
                
                {booking.customerEmail && (
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-gray-900">{booking.customerEmail}</div>
                    </div>
                  </div>
                )}
              </div>

              {booking.totalAmount && (
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Total Amount</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">₹{booking.totalAmount.toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>

          {/* Provider Information */}
          {booking.assignedProviderName && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Provider</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{booking.assignedProviderName}</div>
                    {booking.assignmentStatus === 'pending' && (
                      <div className="text-sm text-yellow-600 mt-1">Provider is reviewing your request...</div>
                    )}
                    {booking.assignmentStatus === 'accepted' && booking.providerAvailability && (
                      <div className="text-sm text-green-600 mt-1">
                        ✓ Provider confirmed • Available: {booking.providerAvailability}
                      </div>
                    )}
                    {booking.providerData?.rating > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">{booking.providerData.rating.toFixed(1)} Rating</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {booking.additionalNotes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{booking.additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Booking Timeline */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircleIconSolid className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Booking Created</div>
                  <div className="text-xs text-gray-500">
                    {booking.createdAt.toDate().toLocaleString('en-IN', { 
                      dateStyle: 'long', 
                      timeStyle: 'short' 
                    })}
                  </div>
                </div>
              </div>
              {booking.status !== 'pending' && (
                <div className="flex items-center gap-3">
                  <CheckCircleIconSolid className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Last Updated</div>
                    <div className="text-xs text-gray-500">
                      {booking.updatedAt.toDate().toLocaleString('en-IN', { 
                        dateStyle: 'long', 
                        timeStyle: 'short' 
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            Back to Dashboard
          </Link>
          {profile?.role === 'user' && booking.status === 'pending' && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to cancel this booking?')) {
                  // TODO: Implement cancel booking
                  alert('Cancel booking functionality will be implemented');
                }
              }}
              className="flex-1 bg-red-100 text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-200 transition-colors"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

