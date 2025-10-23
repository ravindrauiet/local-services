'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  MapPinIcon, 
  MagnifyingGlassIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  ScissorsIcon,
  CogIcon,
  SparklesIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Service categories with detailed information
const serviceCategories = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    description: 'Electrical repairs, installations, and maintenance services',
    services: ['Home Wiring', 'Switch Installation', 'Fan & Light Setup', 'MCB Repair', 'Emergency Services'],
    avgPrice: '₹500 - ₹2,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 45,
    rating: 4.8
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    description: 'Plumbing repairs, installations, and maintenance',
    services: ['Pipe Repair', 'Tap Installation', 'Bathroom Fitting', 'Water Tank Cleaning', 'Emergency Repairs'],
    avgPrice: '₹300 - ₹1,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 38,
    rating: 4.7
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    description: 'Complete wedding planning and arrangements',
    services: ['Pandit Booking', 'Samagri Supply', 'Decorations', 'Event Management', 'Photography'],
    avgPrice: '₹15,000 - ₹50,000',
    avgTime: '1-2 days',
    popularity: 'Medium',
    providers: 25,
    rating: 4.9
  },
  {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    description: 'Custom tailoring and ready-made clothing',
    services: ['Custom Suits', 'Alterations', 'Ready-made Clothes', 'Designer Wear', 'Wedding Outfits'],
    avgPrice: '₹200 - ₹5,000',
    avgTime: '3-7 days',
    popularity: 'Medium',
    providers: 32,
    rating: 4.6
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    description: 'AC repair, RO maintenance, and installations',
    services: ['AC Repair', 'RO Service', 'Installation', 'Maintenance', 'Gas Filling'],
    avgPrice: '₹800 - ₹3,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 28,
    rating: 4.5
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    description: 'Hair styling, facials, and beauty treatments',
    services: ['Hair Cut & Style', 'Facial Treatment', 'Manicure & Pedicure', 'Bridal Makeup', 'Spa Services'],
    avgPrice: '₹500 - ₹2,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 42,
    rating: 4.8
  }
];

// Popular services in your area
const popularServices = [
  {
    id: 1,
    name: 'Emergency Electrician',
    category: 'Electrician',
    description: '24/7 emergency electrical services',
    price: '₹800 - ₹1,500',
    rating: 4.9,
    reviews: 127,
    distance: '0.5 km',
    available: true
  },
  {
    id: 2,
    name: 'AC Repair & Service',
    category: 'RO & AC Services',
    description: 'Professional AC repair and maintenance',
    price: '₹1,200 - ₹2,500',
    rating: 4.7,
    reviews: 89,
    distance: '1.2 km',
    available: true
  },
  {
    id: 3,
    name: 'Wedding Pandit Booking',
    category: 'Wedding Services',
    description: 'Traditional wedding ceremonies and rituals',
    price: '₹3,000 - ₹8,000',
    rating: 4.9,
    reviews: 156,
    distance: '2.1 km',
    available: true
  }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState('Noida, UP');

  const filteredCategories = serviceCategories.filter(category => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'popular') return category.popularity === 'High';
    return category.id === selectedCategory;
  });

  const filteredServices = popularServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
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
              Find <span className="text-yellow-300">Services</span> Near You
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover and book trusted local services in your area. 
              From home repairs to special events, we connect you with verified professionals.
            </p>
            
            {/* Location & Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-4">
                <MapPinIcon className="h-6 w-6 text-yellow-300 mr-2" />
                <span className="text-lg text-blue-100">Services available in</span>
                <span className="text-lg font-semibold text-white ml-2">{userLocation}</span>
              </div>
              
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for services (e.g., electrician, plumber, wedding services)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">6+</div>
                <div className="text-sm text-blue-200">Service Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-sm text-blue-200">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8★</div>
                <div className="text-sm text-blue-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-blue-200">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedCategory('popular')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'popular'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              Popular
            </button>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of local services. 
              All providers are verified and rated by real customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 group cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.popularity === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {category.popularity} Demand
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Service List */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          {service}
                        </span>
                      ))}
                      {category.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                          +{category.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.providers}</div>
                      <div className="text-xs text-gray-600">Providers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.rating}★</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.avgTime}</div>
                      <div className="text-xs text-gray-600">Avg Time</div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="font-bold text-lg text-gray-900">{category.avgPrice}</div>
                    </div>
                    <Link
                      href={`/services/${category.id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center"
                    >
                      Browse
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Services in Your Area */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Services in <span className="text-blue-600">{userLocation}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These are the most booked services in your area right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{service.category}</p>
                  </div>
                  <div className="flex items-center">
                    <StarIconSolid className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {service.distance}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {service.reviews} reviews
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="font-bold text-lg text-gray-900">{service.price}</div>
                  </div>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your service booked in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Search & Select</h3>
              <p className="text-gray-600">
                Browse service categories or search for specific services. 
                View provider details, ratings, and pricing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Service</h3>
              <p className="text-gray-600">
                Fill in your details, select preferred date and time. 
                Get instant confirmation and provider contact.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Service</h3>
              <p className="text-gray-600">
                Provider arrives on time, completes the service. 
                Rate and review your experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their local service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Book a Service Now
            </Link>
            <Link
              href="/providers"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Browse Providers
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}