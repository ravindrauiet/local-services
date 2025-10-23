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
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  CogIcon,
  HeartIcon,
  PaintBrushIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Enhanced provider data with business information
const mockProviders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    businessName: 'Rajesh Electrical Services',
    serviceType: 'Electrician',
    address: 'Sector 15, Noida',
    phone: '+91 98765 43210',
    email: 'rajesh@electricalservices.com',
    rating: 4.8,
    totalReviews: 127,
    description: 'Professional electrician with 10+ years of experience. Specializes in home wiring, repairs, and installations. Available 24/7 for emergency services.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '10+ years',
    responseTime: '1 hour',
    price: '₹500 - ₹2,000',
    verified: true,
    specialties: ['Home Wiring', 'Emergency Repairs', 'Installations'],
    languages: ['Hindi', 'English'],
    workingHours: '9:00 AM - 8:00 PM (Mon-Sat)',
    completedJobs: 450,
    joinDate: '2022-01-15',
    businessType: 'Individual Professional',
    licenseNumber: 'ELC-UP-2022-001',
    insurance: true,
    warranty: '6 months'
  },
  {
    id: '2',
    name: 'Amit Sharma',
    businessName: 'Sharma Plumbing Works',
    serviceType: 'Plumber',
    address: 'Sector 18, Noida',
    phone: '+91 98765 43211',
    email: 'amit@sharmaplumbing.com',
    rating: 4.6,
    totalReviews: 89,
    description: 'Expert plumber offering 24/7 emergency services. All types of plumbing repairs and installations with quality guarantee.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6c5?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '8+ years',
    responseTime: '2 hours',
    price: '₹300 - ₹1,500',
    verified: true,
    specialties: ['Emergency Repairs', 'Installations', 'Maintenance'],
    languages: ['Hindi', 'English', 'Punjabi'],
    workingHours: '8:00 AM - 7:00 PM (Mon-Sat)',
    completedJobs: 320,
    joinDate: '2022-03-20',
    businessType: 'Small Business',
    licenseNumber: 'PLB-UP-2022-002',
    insurance: true,
    warranty: '3 months'
  },
  {
    id: '3',
    name: 'Priya Singh',
    businessName: 'Priya Wedding Services',
    serviceType: 'Wedding Services',
    address: 'Sector 22, Noida',
    phone: '+91 98765 43212',
    email: 'priya@weddingservices.com',
    rating: 4.9,
    totalReviews: 156,
    description: 'Complete wedding services including pandit booking, samagri, decorations, and event management. With over 12 years of experience.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '12+ years',
    responseTime: '4 hours',
    price: '₹15,000 - ₹50,000',
    verified: true,
    specialties: ['Wedding Planning', 'Decorations', 'Event Management'],
    languages: ['Hindi', 'English', 'Punjabi'],
    workingHours: '9:00 AM - 8:00 PM (Mon-Sat)',
    completedJobs: 500,
    joinDate: '2021-11-10',
    businessType: 'Event Management Company',
    licenseNumber: 'WED-UP-2021-001',
    insurance: true,
    warranty: 'Event completion'
  },
  {
    id: '4',
    name: 'Vikram Tailor',
    businessName: 'Vikram Tailoring House',
    serviceType: 'Cloth Shop & Tailor',
    address: 'Sector 12, Noida',
    phone: '+91 98765 43213',
    email: 'vikram@tailoringhouse.com',
    rating: 4.7,
    totalReviews: 203,
    description: 'Professional tailoring services for men and women. Custom suits, alterations, and ready-made clothing with premium quality.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '15+ years',
    responseTime: '1 day',
    price: '₹200 - ₹5,000',
    verified: true,
    specialties: ['Custom Suits', 'Alterations', 'Ready-made'],
    languages: ['Hindi', 'English'],
    workingHours: '10:00 AM - 8:00 PM (Mon-Sat)',
    completedJobs: 1200,
    joinDate: '2021-08-05',
    businessType: 'Retail Shop',
    licenseNumber: 'TAI-UP-2021-003',
    insurance: false,
    warranty: '1 month'
  },
  {
    id: '5',
    name: 'Rohit AC Services',
    businessName: 'Cool Air Solutions',
    serviceType: 'RO & AC Services',
    address: 'Sector 25, Noida',
    phone: '+91 98765 43214',
    email: 'rohit@coolairsolutions.com',
    rating: 4.5,
    totalReviews: 78,
    description: 'AC repair, maintenance, and installation services. Also provides RO water purifier services with genuine parts guarantee.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '6+ years',
    responseTime: '3 hours',
    price: '₹800 - ₹3,000',
    verified: true,
    specialties: ['AC Repair', 'RO Services', 'Maintenance'],
    languages: ['Hindi', 'English'],
    workingHours: '8:00 AM - 7:00 PM (Mon-Sat)',
    completedJobs: 280,
    joinDate: '2022-06-12',
    businessType: 'Service Center',
    licenseNumber: 'ACR-UP-2022-004',
    insurance: true,
    warranty: '1 year'
  },
  {
    id: '6',
    name: 'Beauty Palace',
    businessName: 'Beauty Palace Salon',
    serviceType: 'Beauty & Wellness',
    address: 'Sector 16, Noida',
    phone: '+91 98765 43215',
    email: 'info@beautypalace.com',
    rating: 4.8,
    totalReviews: 134,
    description: 'Full-service beauty salon offering haircuts, styling, facials, and other beauty treatments with modern equipment.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    businessPhoto: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    isApproved: true,
    experience: '9+ years',
    responseTime: '2 hours',
    price: '₹500 - ₹2,500',
    verified: true,
    specialties: ['Hair Styling', 'Facials', 'Beauty Treatments'],
    languages: ['Hindi', 'English'],
    workingHours: '9:00 AM - 8:00 PM (Mon-Sat)',
    completedJobs: 890,
    joinDate: '2021-12-01',
    businessType: 'Beauty Salon',
    licenseNumber: 'BEA-UP-2021-005',
    insurance: true,
    warranty: 'Service satisfaction'
  }
];

const serviceTypes = [
  'All Providers',
  'Electrician',
  'Plumber',
  'Wedding Services',
  'Cloth Shop & Tailor',
  'RO & AC Services',
  'Beauty & Wellness'
];

const serviceIcons = {
  'Electrician': BoltIcon,
  'Plumber': WrenchScrewdriverIcon,
  'Wedding Services': HeartIcon,
  'Cloth Shop & Tailor': ScissorsIcon,
  'RO & AC Services': CogIcon,
  'Beauty & Wellness': SparklesIcon
};

const serviceColors = {
  'Electrician': 'from-yellow-500 to-orange-500',
  'Plumber': 'from-blue-500 to-cyan-500',
  'Wedding Services': 'from-pink-500 to-rose-500',
  'Cloth Shop & Tailor': 'from-purple-500 to-indigo-500',
  'RO & AC Services': 'from-teal-500 to-emerald-500',
  'Beauty & Wellness': 'from-rose-500 to-pink-500'
};

export default function ProvidersPage() {
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Providers');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = providers;

    // Filter by service type
    if (selectedServiceType !== 'All Providers') {
      filtered = filtered.filter(provider => provider.serviceType === selectedServiceType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'jobs':
          return b.completedJobs - a.completedJobs;
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
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our <span className="text-yellow-300">Expert</span> Providers
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover verified service providers in your area. Each provider is background-checked, 
              rated by real customers, and committed to delivering exceptional service.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{providers.length}+</div>
                <div className="text-sm text-green-200">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.7★</div>
                <div className="text-sm text-green-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">3000+</div>
                <div className="text-sm text-green-200">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-green-200">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, business, location, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Service Type Filter */}
            <div className="lg:w-64">
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="experience">Sort by Experience</option>
                <option value="jobs">Sort by Jobs Done</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-gray-900">{filteredProviders.length}</span> service provider{filteredProviders.length !== 1 ? 's' : ''}
            {selectedServiceType !== 'All Providers' && (
              <span> for <span className="font-semibold text-green-600">{selectedServiceType}</span></span>
            )}
          </p>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProviders.map((provider) => {
              const ServiceIcon = serviceIcons[provider.serviceType as keyof typeof serviceIcons] || SparklesIcon;
              const serviceColor = serviceColors[provider.serviceType as keyof typeof serviceColors] || 'from-gray-500 to-gray-600';
              
              return (
                <div key={provider.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  {/* Provider Header */}
                  <div className={`bg-gradient-to-r ${serviceColor} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-sm font-medium mr-3">
                              {provider.serviceType}
                            </span>
                            {provider.verified && (
                              <div className="flex items-center text-green-300">
                                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                                <span className="text-xs font-medium">Verified</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{provider.name}</h3>
                          <p className="text-white/90 text-sm">{provider.businessName}</p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <ServiceIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {renderStars(provider.rating)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/90">{provider.totalReviews} reviews</div>
                          <div className="text-xs text-white/80">{provider.experience}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Business Photo */}
                    <div className="mb-4">
                      <img
                        src={provider.businessPhoto}
                        alt={provider.businessName}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center mb-4">
                      <img
                        src={provider.photo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                      />
                      <div>
                        <div className="text-sm text-gray-600">Response Time</div>
                        <div className="font-semibold text-gray-900">{provider.responseTime}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {provider.description}
                    </p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-900 mb-2">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {provider.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                            {specialty}
                          </span>
                        ))}
                        {provider.specialties.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                            +{provider.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Business Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Business Type</div>
                        <div className="text-sm font-medium text-gray-900">{provider.businessType}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Jobs Completed</div>
                        <div className="text-sm font-medium text-gray-900">{provider.completedJobs}+</div>
                      </div>
                    </div>

                    {/* Location & Contact */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {provider.address}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Starting from</div>
                        <div className="font-bold text-lg text-gray-900">{provider.price}</div>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Transparent Pricing</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link
                        href={`/providers/${provider.id}`}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/book?provider=${provider.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No providers found
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Try adjusting your search criteria or browse all providers
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedServiceType('All Providers');
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Why Choose Our Providers Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="text-green-600">Providers?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              All our service providers go through a rigorous verification process to ensure quality, 
              reliability, and customer satisfaction. We maintain the highest standards for our provider network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Verified Providers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All providers are background-checked and verified for authenticity and reliability
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <StarIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customer Rated
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Real customer reviews and ratings for every service provider to ensure quality
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ClockIcon className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support for all your service needs and emergencies
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We guarantee the quality of all services with our satisfaction promise
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Service Provider?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust our verified service providers for all their needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Browse Services
            </Link>
            <Link
              href="/book"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Book a Service Now
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}