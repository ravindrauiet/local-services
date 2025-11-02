'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  StarIcon, 
  MapPinIcon, 
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  CogIcon,
  HeartIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Load real providers from Firestore (approved and active)
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

interface Provider {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  experience?: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  businessPhoto?: string;
  photo?: string;
  responseTime?: string;
  businessType?: string;
  completedJobs?: number;
  price?: string;
  verified?: boolean;
  isApproved: boolean;
  isActive: boolean;
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Providers');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(
          collection(db, 'providers'),
          where('isApproved', '==', true),
          where('isActive', '==', true)
        );
        const snap = await getDocs(q);
        const list: Provider[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          list.push({ 
            id: docSnap.id, 
            ...data,
            rating: data.rating || 0,
            totalReviews: data.totalReviews || 0,
            specialties: data.specialties || [],
            isApproved: data.isApproved || false,
            isActive: data.isActive || false,
          } as Provider);
        });
        setProviders(list);
        setFilteredProviders(list);
      } catch (e) {
        console.error('Failed to load providers', e);
      }
    };
    load();
  }, []);

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
        (provider.businessName && provider.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        provider.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort providers (fallbacks for missing fields)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviews':
          return (b.totalReviews || 0) - (a.totalReviews || 0);
        case 'experience':
          return parseInt(b.experience || '0') - parseInt(a.experience || '0');
        case 'jobs':
          return (b.completedJobs || 0) - (a.completedJobs || 0);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const ServiceIcon = serviceIcons[provider.serviceType as keyof typeof serviceIcons] || SparklesIcon;
              const serviceColor = serviceColors[provider.serviceType as keyof typeof serviceColors] || 'from-gray-500 to-gray-600';
              
              return (
                <div 
                  key={provider.id} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 transform hover:-translate-y-2"
                >
                  {/* Premium Card Header with Gradient */}
                  <div className={`relative bg-gradient-to-br ${serviceColor} p-6 text-white overflow-hidden`}>
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-8 translate-y-8"></div>
                    </div>
                    
                    {/* Provider Photo/Avatar */}
                    <div className="relative z-10 flex items-center gap-4 mb-4">
                      {provider.photo ? (
                        <div className="relative">
                          <img
                            src={provider.photo}
                            alt={provider.name}
                            className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-20 h-20 rounded-2xl border-4 border-white shadow-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">${provider.name?.charAt(0) || '?'}</div>`;
                              }
                            }}
                          />
                          {provider.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                              <ShieldCheckIcon className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-4 border-white shadow-xl`}>
                            {provider.name?.charAt(0) || '?'}
                          </div>
                          {provider.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                              <ShieldCheckIcon className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold truncate">{provider.name}</h3>
                        </div>
                        {provider.businessName && (
                          <p className="text-white/90 text-sm truncate">{provider.businessName}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                            <StarIconSolid className="h-4 w-4 text-yellow-300 mr-1" />
                            <span className="text-sm font-semibold">{provider.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-xs text-white/80">({provider.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Type Badge */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                          <ServiceIcon className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-xs font-semibold">
                          {provider.serviceType}
                        </span>
                      </div>
                      {provider.experience && (
                        <div className="text-xs text-white/90 font-medium">
                          {provider.experience}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Business Photo (if available) */}
                    {provider.businessPhoto && (
                      <div className="mb-4 -mx-6 -mt-6">
                        <img
                          src={provider.businessPhoto}
                          alt={provider.businessName || provider.name}
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed min-h-[60px]">
                      {provider.description || 'Professional service provider committed to quality work.'}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{provider.completedJobs || 0}+</div>
                        <div className="text-xs text-gray-600">Jobs Done</div>
                      </div>
                      <div className="text-center border-x border-gray-200">
                        <div className="text-lg font-bold text-gray-900">{provider.rating.toFixed(1)}★</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{provider.responseTime || 'N/A'}</div>
                        <div className="text-xs text-gray-600">Response</div>
                      </div>
                    </div>

                    {/* Specialties */}
                    {provider.specialties && provider.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Specialties</div>
                        <div className="flex flex-wrap gap-1.5">
                          {provider.specialties.slice(0, 4).map((specialty, index) => (
                            <span 
                              key={index} 
                              className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-blue-100"
                            >
                              {specialty}
                            </span>
                          ))}
                          {provider.specialties.length > 4 && (
                            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                              +{provider.specialties.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    <div className="flex items-start gap-2 mb-4 p-2 bg-blue-50 rounded-lg">
                      <MapPinIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700 leading-relaxed">{provider.address}</span>
                    </div>

                    {/* Price Info */}
                    {provider.price && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Starting Price</div>
                            <div className="text-xl font-bold text-gray-900">{provider.price}</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-6">
                      <Link
                        href={`/providers/${provider.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm group/btn"
                      >
                        <span className="flex items-center justify-center gap-2">
                          View Details
                          <ArrowRightIcon className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                      <Link
                        href={`/book?provider=${provider.id}&category=${provider.serviceType.toLowerCase().replace(' & ', '-').replace(/\s+/g, '-')}`}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm"
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