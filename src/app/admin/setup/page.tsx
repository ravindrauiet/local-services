'use client';

import { useState } from 'react';
import { FirebaseSetupService } from '@/lib/firebase-setup';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function AdminSetupPage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initializationStatus, setInitializationStatus] = useState<{
    admins: boolean;
    users: boolean;
    providers: boolean;
    bookings: boolean;
    notifications: boolean;
  }>({
    admins: false,
    users: false,
    providers: false,
    bookings: false,
    notifications: false
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initializeCollection = async (collectionName: string, initFunction: () => Promise<void>) => {
    try {
      await initFunction();
      setInitializationStatus(prev => ({ ...prev, [collectionName]: true }));
      return true;
    } catch (error) {
      console.error(`Error initializing ${collectionName}:`, error);
      setError(`Failed to initialize ${collectionName}`);
      return false;
    }
  };

  const handleInitializeAll = async () => {
    setIsInitializing(true);
    setError(null);
    setSuccess(null);
    setInitializationStatus({
      admins: false,
      users: false,
      providers: false,
      bookings: false,
      notifications: false
    });

    try {
      await FirebaseSetupService.initializeAll();
      setSuccess('All Firebase collections initialized successfully!');
      setInitializationStatus({
        admins: true,
        users: true,
        providers: true,
        bookings: true,
        notifications: true
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      setError('Failed to initialize Firebase collections. Please check the console for details.');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleInitializeIndividual = async (collectionName: string) => {
    setIsInitializing(true);
    setError(null);
    setSuccess(null);

    try {
      let result = false;
      switch (collectionName) {
        case 'admins':
          result = await initializeCollection('admins', FirebaseSetupService.initializeAdmins);
          break;
        case 'users':
          result = await initializeCollection('users', FirebaseSetupService.initializeUsers);
          break;
        case 'providers':
          result = await initializeCollection('providers', FirebaseSetupService.initializeProviders);
          break;
        case 'bookings':
          result = await initializeCollection('bookings', FirebaseSetupService.initializeBookings);
          break;
        case 'notifications':
          result = await initializeCollection('notifications', FirebaseSetupService.initializeNotifications);
          break;
      }

      if (result) {
        setSuccess(`${collectionName} initialized successfully!`);
      }
    } catch (error) {
      console.error(`Error initializing ${collectionName}:`, error);
      setError(`Failed to initialize ${collectionName}`);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <ShieldCheckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Firebase Setup
            </h1>
            <p className="text-gray-600">
              Initialize your Firestore collections with sample data
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <div className="mt-2 text-sm text-green-700">{success}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Initialize All Collections
            </h2>
            <button
              onClick={handleInitializeAll}
              disabled={isInitializing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isInitializing ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Initializing...
                </>
              ) : (
                'Initialize All Collections'
              )}
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Initialize Individual Collections
            </h2>

            {[
              { key: 'admins', name: 'Admin Users', description: 'System administrators and moderators' },
              { key: 'users', name: 'Users', description: 'Regular users and service providers' },
              { key: 'providers', name: 'Service Providers', description: 'Approved and pending service providers' },
              { key: 'bookings', name: 'Bookings', description: 'Service bookings and appointments' },
              { key: 'notifications', name: 'Notifications', description: 'System notifications and alerts' }
            ].map((collection) => (
              <div key={collection.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {initializationStatus[collection.key as keyof typeof initializationStatus] ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    ) : (
                      <div className="h-6 w-6 border-2 border-gray-300 rounded-full mr-3" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{collection.name}</h3>
                      <p className="text-sm text-gray-500">{collection.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInitializeIndividual(collection.key)}
                    disabled={isInitializing || initializationStatus[collection.key as keyof typeof initializationStatus]}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {initializationStatus[collection.key as keyof typeof initializationStatus] ? 'Initialized' : 'Initialize'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This will create sample data in your Firestore database</li>
              <li>• Make sure your Firebase project is properly configured</li>
              <li>• Admin credentials: admin@localservices.com / admin123</li>
              <li>• This setup is only needed once for initial data</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/admin"
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              ← Back to Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
