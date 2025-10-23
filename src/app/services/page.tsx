'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  ScissorsIcon,
  CogIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Enhanced mock data with more details
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
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹299/hour',
    responseTime: '30 mins',
    verified: true,
    experience: '10+ years',
    services: ['Home Wiring', 'Repairs', 'Installations', 'Emergency Service']
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
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹249/hour',
    responseTime: '45 mins',
    verified: true,
    experience: '8+ years',
    services: ['Pipe Repair', 'Installation', 'Emergency', 'Maintenance']
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
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹15,000/event',
    responseTime: '2 hours',
    verified: true,
    experience: '12+ years',
    services: ['Pandit Booking', 'Samagri', 'Decoration', 'Event Management']
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
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹500/garment',
    responseTime: '1 hour',
    verified: true,
    experience: '15+ years',
    services: ['Custom Suits', 'Alterations', 'Ready Made', 'Design Consultation']
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
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹399/service',
    responseTime: '1 hour',
    verified: true,
    experience: '6+ years',
    services: ['AC Repair', 'Maintenance', 'Installation', 'RO Service']
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
    photo: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&h=100&fit=crop&crop=face',
    isApproved: true,
    price: '₹800/session',
    responseTime: '30 mins',
    verified: true,
    experience: '5+ years',
    services: ['Haircut', 'Styling', 'Facial', 'Beauty Treatment']
  }
];

const serviceTypes = [
  { name: 'All Services', icon: SparklesIcon, count: 6 },
  { name: 'Electrician', icon: BoltIcon, count: 1 },
  { name: 'Plumber', icon: WrenchScrewdriverIcon, count: 1 },
  { name: 'Wedding Services', icon: HeartIcon, count: 1 },
  { name: 'Cloth Shop & Tailor', icon: ScissorsIcon, count: 1 },
  { name: 'RO & AC Services', icon: CogIcon, count: 1 },
  { name: 'Beauty & Wellness', icon: SparklesIcon, count: 1 }
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' }
];

export default function ServicesPage() {
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

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
        provider.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'price_low':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price_high':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <SparklesIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Verified Professionals</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Service Provider
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Browse through our verified service providers and book the one that best fits your needs. All professionals are background verified and skilled.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, business, or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div className="sm:w-64 relative">
                  <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedServiceType}
                    onChange={(e) => setSelectedServiceType(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg appearance-none bg-white"
                  >
                    {serviceTypes.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name} ({type.count})
                      </option>
                    ))}
                  </select>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Search
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              <div className="flex items-center text-blue-100">
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">100% Verified</span>
              </div>
              <div className="flex items-center text-blue-100">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Quick Response</span>
              </div>
              <div className="flex items-center text-blue-100">
                <StarIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">4.7★ Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    sortBy === option.value
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
                {selectedServiceType !== 'All Services' && ` for ${selectedServiceType}`}
              </span>
            </div>
          </div>
        </div>

        {/* Service Type Quick Filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
          <div className="flex flex-wrap gap-3">
            {serviceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.name}
                  onClick={() => setSelectedServiceType(type.name)}
                  className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedServiceType === type.name
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {type.name}
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                    {type.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Provider Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {provider.businessName}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {provider.serviceType}
                          </span>
                          {provider.verified && (
                            <div className="flex items-center text-green-600">
                              <ShieldCheckIcon className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="mb-4">
                    {renderStars(provider.rating)}
                    <p className="text-sm text-gray-500 mt-1">
                      {provider.totalReviews} reviews • {provider.experience} experience
                    </p>
                  </div>

                  {/* Price and Response Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-green-600">
                      <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                      <span className="font-bold text-lg">{provider.price}</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <ClockIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">{provider.responseTime}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {provider.description}
                  </p>

                  {/* Services */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {provider.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          {service}
                        </span>
                      ))}
                      {provider.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          +{provider.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {provider.address}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/providers/${provider.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 text-center py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/book?provider=${provider.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-gray-400 mb-6">
                <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No providers found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search criteria or browse all services to find the perfect professional for your needs.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedServiceType('All Services');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our network of service providers and start earning today. We're always looking for skilled professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/provider/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Become a Provider
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}