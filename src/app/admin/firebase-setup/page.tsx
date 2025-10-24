'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CogIcon,
  ShieldCheckIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

export default function FirebaseSetupGuide() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Enable Authentication',
      description: 'Enable Email/Password authentication in Firebase Console',
      icon: ShieldCheckIcon,
      details: [
        'Go to Firebase Console → Authentication',
        'Click "Get Started" if not already enabled',
        'Go to "Sign-in method" tab',
        'Enable "Email/Password" provider',
        'Click "Save"'
      ]
    },
    {
      id: 2,
      title: 'Create Firestore Database',
      description: 'Set up Firestore database for your project',
      icon: CircleStackIcon,
      details: [
        'Go to Firebase Console → Firestore Database',
        'Click "Create database"',
        'Choose "Start in test mode" (for development)',
        'Select a location for your database',
        'Click "Done"'
      ]
    },
    {
      id: 3,
      title: 'Create Admin Users',
      description: 'Create admin users in Firebase Authentication',
      icon: CogIcon,
      details: [
        'Go to Firebase Console → Authentication → Users',
        'Click "Add user"',
        'Email: admin@localservices.com',
        'Password: admin123',
        'Click "Add user"',
        'Repeat for moderator@localservices.com / mod123'
      ]
    },
    {
      id: 4,
      title: 'Initialize Data',
      description: 'Initialize Firestore collections with sample data',
      icon: CheckCircleIcon,
      details: [
        'Go to /admin/setup page',
        'Click "Initialize All Collections"',
        'This will create sample data in Firestore',
        'Admin users will be created in Firestore'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <ShieldCheckIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Firebase Setup Guide
            </h1>
            <p className="text-gray-600">
              Follow these steps to properly configure Firebase for your admin system
            </p>
          </div>

          {/* Current Status */}
          <div className="mb-8 p-4 bg-blue-50 rounded-md">
            <div className="flex">
              <InformationCircleIcon className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Current Status</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Your Firebase project is configured but Authentication needs to be enabled.</p>
                  <p className="mt-1">Follow the steps below to complete the setup.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h3 className={`text-lg font-medium ${
                        isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        Step {step.id}: {step.title}
                      </h3>
                      <p className={`mt-1 text-sm ${
                        isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                      
                      {isActive && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-blue-900 mb-2">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>{detail}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Open Firebase Console
            </a>
            
            <a
              href="/admin/setup"
              className="flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <CircleStackIcon className="h-5 w-5 mr-2" />
              Initialize Data
            </a>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-md">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Troubleshooting</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>If you&apos;re still getting authentication errors:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Make sure Email/Password is enabled in Firebase Authentication</li>
                    <li>Check that your Firebase project ID matches the configuration</li>
                    <li>Verify that Firestore is enabled and accessible</li>
                    <li>Try using the fallback authentication system (already implemented)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/admin/login"
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              ← Back to Admin Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
