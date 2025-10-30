'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { ShieldCheckIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function ProviderDashboardPage() {
  const { profile, isLoading } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!profile) router.push('/login');
      else if (profile.role !== 'provider') router.push('/provider/register');
    }
  }, [profile, isLoading, router]);

  if (isLoading || !profile || profile.role !== 'provider') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Provider Dashboard</h1>
          <p className="text-green-100 mt-2">Welcome, {profile.name}</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/providers" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-semibold text-gray-900">View Public Listing</div>
                <div className="text-sm text-gray-600">See how customers see you</div>
              </div>
            </div>
          </Link>

          <Link href="/profile" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <Cog6ToothIcon className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">Manage Profile</div>
                <div className="text-sm text-gray-600">Update your details</div>
              </div>
            </div>
          </Link>

          <Link href="/book" className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="h-6 w-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Incoming Bookings</div>
                <div className="text-sm text-gray-600">(placeholder)</div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}


