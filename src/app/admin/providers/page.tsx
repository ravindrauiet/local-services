'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAdminAuth } from '@/contexts/SimpleAdminAuthContext';

interface Provider {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  email: string;
  phone: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt?: Date | { seconds: number; nanoseconds: number } | string | number;
}

export default function AdminProvidersPage() {
  const { admin, isLoading } = useSimpleAdminAuth();
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isLoading && !admin) router.push('/admin/login');
  }, [admin, isLoading, router]);

  useEffect(() => {
    const fetchProviders = async () => {
      if (!admin) return;
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/admin/providers');
        if (!res.ok) throw new Error('Failed to load providers');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load providers');
        setProviders(json.data || []);
      } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error('Failed to load providers');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [admin]);

  const approveProvider = async (providerId: string) => {
    try {
      setRowBusy(prev => ({ ...prev, [providerId]: true }));
      const res = await fetch('/api/admin/providers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, action: 'approve' })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Approve failed');
      setProviders(prev => prev.map(p => p.id === providerId ? { ...p, isApproved: true, isActive: true } : p));
    } catch (e: unknown) {
      const error = e instanceof Error ? e : new Error('Failed to approve');
      alert(error.message);
    } finally {
      setRowBusy(prev => ({ ...prev, [providerId]: false }));
    }
  };

  const toggleActive = async (providerId: string) => {
    try {
      setRowBusy(prev => ({ ...prev, [providerId]: true }));
      const res = await fetch('/api/admin/providers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, action: 'toggleStatus' })
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Update failed');
      setProviders(prev => prev.map(p => p.id === providerId ? { ...p, isActive: !p.isActive } : p));
    } catch (e: unknown) {
      const error = e instanceof Error ? e : new Error('Failed to update status');
      alert(error.message);
    } finally {
      setRowBusy(prev => ({ ...prev, [providerId]: false }));
    }
  };

  if (isLoading || !admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Providers</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td className="px-6 py-4 text-gray-600" colSpan={5}>Loading providers...</td>
                  </tr>
                ) : providers.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-gray-600" colSpan={5}>No providers found.</td>
                  </tr>
                ) : (
                  providers.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.businessName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.serviceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.phone} · {p.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {p.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${p.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {!p.isApproved && (
                            <button
                              onClick={() => approveProvider(p.id)}
                              disabled={rowBusy[p.id]}
                              className="px-3 py-1 rounded-md bg-green-600 text-white text-xs hover:bg-green-700 disabled:opacity-50"
                            >
                              {rowBusy[p.id] ? 'Approving...' : 'Approve'}
                            </button>
                          )}
                          <button
                            onClick={() => toggleActive(p.id)}
                            disabled={rowBusy[p.id]}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 disabled:opacity-50"
                          >
                            {rowBusy[p.id] ? 'Updating...' : (p.isActive ? 'Deactivate' : 'Activate')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}


