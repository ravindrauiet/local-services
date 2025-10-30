'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/contexts/UserAuthContext';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { profile, user, isLoading, logout } = useUserAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Loading...</div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  const initials = (profile?.name || 'User')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-white">My Profile</h1>
          <p className="text-blue-100 mt-2">Manage your account and preferences</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-12">
        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-start md:items-center flex-col md:flex-row gap-6 md:gap-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center text-2xl font-bold shadow">
              {initials}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  {profile?.role === 'provider' ? 'Provider' : 'Customer'}
                </span>
              </div>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-gray-600">
                <div className="inline-flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
                  {profile?.email}
                </div>
                {profile?.phone ? (
                  <div className="inline-flex items-center">
                    <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                    {profile.phone}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Home
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">{profile?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{profile?.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-gray-900 capitalize">{profile?.role}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/services"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <span>Browse Services</span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/book"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <span>Book a Service</span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/providers"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <span>Find Providers</span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/"
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <span>Home</span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Placeholder for future settings */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Coming soon: Profile Settings</h4>
              <p className="text-gray-600">Edit your name, phone, and notification preferences.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:bg-gray-50">
              <Cog6ToothIcon className="h-5 w-5" />
              Manage Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


