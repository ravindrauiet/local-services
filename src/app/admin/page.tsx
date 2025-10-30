'use client';

import { useSimpleAdminAuth } from '@/contexts/SimpleAdminAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const { admin, isLoading, logout } = useSimpleAdminAuth();
  const router = useRouter();
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalProviders: number;
    totalBookings: number;
    totalRevenue: number;
  } | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, isLoading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!admin) return;
      setStatsLoading(true);
      setStatsError('');
      try {
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to load stats');
        const json = await res.json();
        if (json?.success) {
          setStats({
            totalUsers: json.data.totalUsers,
            totalProviders: json.data.totalProviders,
            totalBookings: json.data.totalBookings,
            totalRevenue: json.data.totalRevenue,
          });
        } else {
          throw new Error(json?.error || 'Failed to load stats');
        }
      } catch (e: any) {
        setStatsError(e?.message || 'Failed to load stats');
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [admin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content (header provided by admin layout) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {admin.name}!</h2>
          <p className="text-gray-600">Manage your local services platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{statsLoading ? '—' : (stats?.totalUsers ?? 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Service Providers</p>
                <p className="text-2xl font-semibold text-gray-900">{statsLoading ? '—' : (stats?.totalProviders ?? 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClipboardDocumentListIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{statsLoading ? '—' : (stats?.totalBookings ?? 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{statsLoading ? '—' : `₹${(stats?.totalRevenue ?? 0).toLocaleString()}`}</p>
              </div>
            </div>
          </div>
        </div>

        {statsError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {statsError}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin/providers')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <h4 className="font-medium text-gray-900">Manage Providers</h4>
              <p className="text-sm text-gray-500">Approve or manage service providers</p>
            </button>
            <button
              onClick={() => router.push('/admin/bookings')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <h4 className="font-medium text-gray-900">View Bookings</h4>
              <p className="text-sm text-gray-500">Track and manage all bookings</p>
            </button>
            <button
              onClick={() => router.push('/admin/users')}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <h4 className="font-medium text-gray-900">User Management</h4>
              <p className="text-sm text-gray-500">Manage users and their accounts</p>
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Admin Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium text-blue-800">Name:</span> {admin.name}</p>
              <p><span className="font-medium text-blue-800">Email:</span> {admin.email}</p>
            </div>
            <div>
              <p><span className="font-medium text-blue-800">Role:</span> {admin.role}</p>
              <p><span className="font-medium text-blue-800">Permissions:</span> {admin.permissions.join(', ')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}