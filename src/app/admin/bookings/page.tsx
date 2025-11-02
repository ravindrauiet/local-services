'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAdminAuth } from '@/contexts/SimpleAdminAuthContext';
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { Timestamp } from 'firebase/firestore';

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
  createdAt: { seconds: number; nanoseconds: number } | Date | string;
  updatedAt: { seconds: number; nanoseconds: number } | Date | string;
  assignedProviderName?: string;
}

interface Provider {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  isApproved: boolean;
  isActive: boolean;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800', icon: ArrowPathIcon },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircleIconSolid },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
};

const assignmentStatusConfig = {
  pending: { label: 'Awaiting Provider', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  accepted: { label: 'Provider Accepted', color: 'bg-green-100 text-green-800', icon: CheckCircleIconSolid },
  rejected: { label: 'Provider Rejected', color: 'bg-red-100 text-red-800', icon: XMarkIcon },
};

export default function AdminBookingsPage() {
  const { admin, isLoading } = useSimpleAdminAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [assigningProvider, setAssigningProvider] = useState<string | null>(null);
  const [selectedBookingForAssign, setSelectedBookingForAssign] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !admin) router.push('/admin/login');
  }, [admin, isLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!admin) return;
      setLoading(true);
      setError('');
      try {
        // Fetch bookings
        const bookingsRes = await fetch('/api/admin/bookings');
        if (!bookingsRes.ok) throw new Error('Failed to load bookings');
        const bookingsJson = await bookingsRes.json();
        if (!bookingsJson.success) throw new Error(bookingsJson.error || 'Failed to load bookings');
        
        // Fetch providers
        const providersRes = await fetch('/api/admin/providers');
        if (!providersRes.ok) throw new Error('Failed to load providers');
        const providersJson = await providersRes.json();
        
        setBookings(bookingsJson.data || []);
        if (providersJson.success) {
          setProviders((providersJson.data || []).filter((p: Provider) => p.isApproved && p.isActive));
        }
      } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error('Failed to load data');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [admin]);

  const handleAssignProvider = async (bookingId: string, providerId: string) => {
    setAssigningProvider(bookingId);
    try {
      const res = await fetch('/api/admin/bookings/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, providerId }),
      });
      
      if (!res.ok) throw new Error('Failed to assign provider');
      const json = await res.json();
      
      if (!json.success) throw new Error(json.error || 'Failed to assign provider');
      
      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId 
          ? { ...b, assignedProviderId: providerId, assignmentStatus: 'pending', assignedProviderName: providers.find(p => p.id === providerId)?.name }
          : b
      ));
      
      setSelectedBookingForAssign(null);
      alert('Provider assigned successfully! Provider will receive notification to accept.');
    } catch (err) {
      console.error('Error assigning provider:', err);
      alert(err instanceof Error ? err.message : 'Failed to assign provider');
    } finally {
      setAssigningProvider(null);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (date: string | Date | Timestamp | { seconds: number; nanoseconds: number } | undefined) => {
    if (!date) return 'N/A';
    try {
      let d: Date;
      if (date instanceof Date) {
        d = date;
      } else if (typeof date === 'string') {
        d = new Date(date);
      } else if (date instanceof Timestamp) {
        d = date.toDate();
      } else if (typeof date === 'object' && 'seconds' in date && typeof date.seconds === 'number') {
        d = new Date(date.seconds * 1000);
      } else {
        // Fallback - should not reach here
        return 'N/A';
      }
      return d.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'N/A';
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h2>
          <p className="text-gray-600">Manage all bookings and assign providers</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ClipboardDocumentListIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">No bookings match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              
              // Filter providers by service type
              const availableProviders = providers.filter(p => 
                p.serviceType === booking.serviceType || !booking.serviceType
              );

              return (
                <div key={booking.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{booking.serviceType}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[booking.status].color}`}>
                              <StatusIcon className="h-3 w-3 inline mr-1" />
                              {statusConfig[booking.status].label}
                            </span>
                            {booking.assignmentStatus && (() => {
                              const AssignmentStatusIcon = assignmentStatusConfig[booking.assignmentStatus].icon;
                              return (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${assignmentStatusConfig[booking.assignmentStatus].color}`}>
                                  <AssignmentStatusIcon className="h-3 w-3 inline mr-1" />
                                  {assignmentStatusConfig[booking.assignmentStatus].label}
                                </span>
                              );
                            })()}
                          </div>
                          
                          {booking.assignedProviderName && (
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <BuildingOfficeIcon className="h-4 w-4" />
                              <span className="font-medium">Assigned Provider: {booking.assignedProviderName}</span>
                              {booking.providerAvailability && (
                                <span className="text-sm">({booking.providerAvailability})</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                            <div className="text-xs text-gray-500">Customer</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.customerPhone}</div>
                            <div className="text-xs text-gray-500">Phone</div>
                          </div>
                        </div>
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
                            <div className="text-sm font-medium text-gray-900">{booking.serviceTime}</div>
                            <div className="text-xs text-gray-500">Service Time</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 md:col-span-2">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.location}</div>
                            <div className="text-xs text-gray-500">{booking.address}</div>
                          </div>
                        </div>
                      </div>

                      {booking.additionalNotes && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Notes: </span>
                            {booking.additionalNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:w-80">
                      <div className="space-y-3">
                        {!booking.assignedProviderId ? (
                          <>
                            <button
                              onClick={() => setSelectedBookingForAssign(selectedBookingForAssign === booking.id ? null : booking.id)}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            >
                              <UserGroupIcon className="h-4 w-4" />
                              Assign Provider
                            </button>
                            
                            {selectedBookingForAssign === booking.id && (
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">Select Provider</h4>
                                {availableProviders.length === 0 ? (
                                  <p className="text-sm text-gray-600">No providers available for this service type.</p>
                                ) : (
                                  <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {availableProviders.map((provider) => (
                                      <button
                                        key={provider.id}
                                        onClick={() => handleAssignProvider(booking.id, provider.id)}
                                        disabled={assigningProvider === booking.id}
                                        className="w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50"
                                      >
                                        <div className="font-medium text-gray-900">{provider.businessName || provider.name}</div>
                                        <div className="text-xs text-gray-500">{provider.serviceType}</div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircleIconSolid className="h-5 w-5 text-green-600" />
                              <span className="font-semibold text-green-900">Provider Assigned</span>
                            </div>
                            <div className="text-sm text-gray-700">
                              <div className="font-medium">{booking.assignedProviderName}</div>
                              {booking.assignmentStatus === 'pending' && (
                                <div className="text-yellow-600 mt-1">Awaiting provider acceptance...</div>
                              )}
                              {booking.assignmentStatus === 'accepted' && booking.providerAvailability && (
                                <div className="text-green-600 mt-1">Available: {booking.providerAvailability}</div>
                              )}
                              {booking.assignmentStatus === 'rejected' && (
                                <button
                                  onClick={() => {
                                    if (confirm('Assign a different provider?')) {
                                      setBookings(prev => prev.map(b => 
                                        b.id === booking.id 
                                          ? { ...b, assignedProviderId: undefined, assignmentStatus: undefined }
                                          : b
                                      ));
                                    }
                                  }}
                                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Reassign Provider
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

