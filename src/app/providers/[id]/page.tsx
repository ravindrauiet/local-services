'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Mock data - in a real app, this would come from Firebase
const mockProvider = {
  id: '1',
  name: 'Rajesh Kumar',
  businessName: 'Rajesh Electrical Services',
  serviceType: 'Electrician',
  address: 'Sector 15, Noida, Uttar Pradesh 201301',
  phone: '+91 98765 43210',
  email: 'rajesh@electricalservices.com',
  rating: 4.8,
  totalReviews: 127,
  description: 'Professional electrician with 10+ years of experience. Specializes in home wiring, repairs, and installations. Available 24/7 for emergency services.',
  experience: '10+ years',
  services: [
    'Home Wiring',
    'Electrical Repairs',
    'Switch & Socket Installation',
    'Fan & Light Installation',
    'MCB & RCCB Installation',
    'Emergency Services'
  ],
  workingHours: '9:00 AM - 8:00 PM (Mon-Sat)',
  photo: null,
  isApproved: true
};

const mockReviews = [
  {
    id: '1',
    customerName: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent service! Rajesh was very professional and completed the work on time. Highly recommended.',
    date: '2024-01-10'
  },
  {
    id: '2',
    customerName: 'Amit Singh',
    rating: 4,
    comment: 'Good work quality. The electrician was knowledgeable and explained everything clearly.',
    date: '2024-01-08'
  },
  {
    id: '3',
    customerName: 'Sunita Gupta',
    rating: 5,
    comment: 'Very satisfied with the service. Will definitely call again for future electrical needs.',
    date: '2024-01-05'
  }
];

export default function ProviderDetailPage() {
  const params = useParams();
  const providerId = params.id as string;
  const [provider, setProvider] = useState(mockProvider);
  const [reviews, setReviews] = useState(mockReviews);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <StarIconSolid className="h-5 w-5 text-yellow-400" />
            ) : (
              <StarIcon className="h-5 w-5 text-gray-300" />
            )}
          </span>
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-900">({rating})</span>
      </div>
    );
  };

  const renderReviewStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
            ) : (
              <StarIcon className="h-4 w-4 text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Services
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Provider Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                {provider.businessName && (
                  <p className="text-xl text-blue-100 mb-4">{provider.businessName}</p>
                )}
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {provider.serviceType}
                  </span>
                </div>
                <div className="flex items-center">
                  {renderStars(provider.rating)}
                  <span className="ml-4 text-blue-100">
                    {provider.totalReviews} reviews
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href={`/book?provider=${provider.id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Service
                </Link>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {provider.services.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                            <div className="flex items-center mt-1">
                              {renderReviewStars(review.rating)}
                              <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <a href={`tel:${provider.phone}`} className="text-blue-600 hover:text-blue-800">
                        {provider.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <a href={`mailto:${provider.email}`} className="text-blue-600 hover:text-blue-800">
                        {provider.email}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                      <span className="text-gray-700">{provider.address}</span>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{provider.workingHours}</span>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
                  <p className="text-gray-700">{provider.experience}</p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Link
                    href={`/book?provider=${provider.id}`}
                    className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors block"
                  >
                    Book Service
                  </Link>
                  <a
                    href={`tel:${provider.phone}`}
                    className="w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors block"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

