'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Mock data - in a real app, this would come from Firebase
const mockProviders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    businessName: 'Rajesh Electrical Services',
    serviceType: 'Electrician',
    address: 'Sector 15, Noida',
    phone: '+91 98765 43210',
    rating: 4.8,
    totalReviews: 127,
    description: 'Professional electrician with 10+ years of experience. Specializes in home wiring, repairs, and installations.',
    photo: null,
    isApproved: true
  },
  {
    id: '2',
    name: 'Amit Sharma',
    businessName: 'Sharma Plumbing Works',
    serviceType: 'Plumber',
    address: 'Sector 18, Noida',
    phone: '+91 98765 43211',
    rating: 4.6,
    totalReviews: 89,
    description: 'Expert plumber offering 24/7 emergency services. All types of plumbing repairs and installations.',
    photo: null,
    isApproved: true
  },
  {
    id: '3',
    name: 'Priya Singh',
    businessName: 'Priya Wedding Services',
    serviceType: 'Wedding Services',
    address: 'Sector 22, Noida',
    phone: '+91 98765 43212',
    rating: 4.9,
    totalReviews: 156,
    description: 'Complete wedding services including pandit booking, samagri, decorations, and event management.',
    photo: null,
    isApproved: true
  },
  {
    id: '4',
    name: 'Vikram Tailor',
    businessName: 'Vikram Tailoring House',
    serviceType: 'Cloth Shop & Tailor',
    address: 'Sector 12, Noida',
    phone: '+91 98765 43213',
    rating: 4.7,
    totalReviews: 203,
    description: 'Professional tailoring services for men and women. Custom suits, alterations, and ready-made clothing.',
    photo: null,
    isApproved: true
  },
  {
    id: '5',
    name: 'Rohit AC Services',
    businessName: 'Cool Air Solutions',
    serviceType: 'RO & AC Services',
    address: 'Sector 25, Noida',
    phone: '+91 98765 43214',
    rating: 4.5,
    totalReviews: 78,
    description: 'AC repair, maintenance, and installation services. Also provides RO water purifier services.',
    photo: null,
    isApproved: true
  },
  {
    id: '6',
    name: 'Beauty Palace',
    businessName: 'Beauty Palace Salon',
    serviceType: 'Beauty & Wellness',
    address: 'Sector 16, Noida',
    phone: '+91 98765 43215',
    rating: 4.8,
    totalReviews: 134,
    description: 'Full-service beauty salon offering haircuts, styling, facials, and other beauty treatments.',
    photo: null,
    isApproved: true
  }
];

const serviceTypes = [
  'All Services',
  'Electrician',
  'Plumber',
  'Wedding Services',
  'Cloth Shop & Tailor',
  'RO & AC Services',
  'Beauty & Wellness'
];

export default function ServicesPage() {
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    let filtered = providers;

    // Filter by service type
    if (selectedServiceType !== 'All Services') {
      filtered = filtered.filter(provider => provider.serviceType === selectedServiceType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedServiceType, sortBy]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
            ) : (
              <StarIcon className="h-4 w-4 text-gray-300" />
            )}
          </span>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Service Providers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our verified service providers and book the one that best fits your needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, business, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Service Type Filter */}
            <div className="lg:w-64">
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} service provider{filteredProviders.length !== 1 ? 's' : ''}
            {selectedServiceType !== 'All Services' && ` for ${selectedServiceType}`}
          </p>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                {/* Provider Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {provider.name}
                    </h3>
                    {provider.businessName && (
                      <p className="text-sm text-gray-600 mb-2">
                        {provider.businessName}
                      </p>
                    )}
                    <div className="flex items-center text-sm text-blue-600 mb-2">
                      <span className="bg-blue-100 px-2 py-1 rounded-full">
                        {provider.serviceType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  {renderStars(provider.rating)}
                  <p className="text-sm text-gray-500 mt-1">
                    {provider.totalReviews} reviews
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {provider.description}
                </p>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {provider.address}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/providers/${provider.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/book?provider=${provider.id}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No providers found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse all services
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedServiceType('All Services');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

