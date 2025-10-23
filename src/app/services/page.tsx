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
  UserGroupIcon,
  FireIcon,
  PhoneIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  XMarkIcon,
  CheckCircleIcon as CheckCircleIconSolid
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  FireIcon as FireIconSolid,
  CheckCircleIcon as CheckCircleIconSolidFill
} from '@heroicons/react/24/solid';

// Service categories with detailed information
const serviceCategories = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    description: 'Professional electrical repairs, installations, and maintenance services',
    services: ['Home Wiring', 'Switch Installation', 'Fan & Light Setup', 'MCB Repair', 'Emergency Services', 'Panel Upgrades'],
    avgPrice: '₹500 - ₹2,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 45,
    rating: 4.8,
    reviews: 1200,
    emergency: true,
    warranty: '1 Year',
    features: ['24/7 Emergency', 'Licensed Electricians', 'Quality Materials', 'Safety Certified']
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    description: 'Expert plumbing repairs, installations, and maintenance solutions',
    services: ['Pipe Repair', 'Tap Installation', 'Bathroom Fitting', 'Water Tank Cleaning', 'Emergency Repairs', 'Leak Detection'],
    avgPrice: '₹300 - ₹1,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 38,
    rating: 4.7,
    reviews: 980,
    emergency: true,
    warranty: '6 Months',
    features: ['Same Day Service', 'Water Saving Solutions', 'Modern Tools', 'Clean Work']
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    description: 'Complete wedding planning and traditional ceremony arrangements',
    services: ['Pandit Booking', 'Samagri Supply', 'Decorations', 'Event Management', 'Photography', 'Catering'],
    avgPrice: '₹15,000 - ₹50,000',
    avgTime: '1-2 days',
    popularity: 'Medium',
    providers: 25,
    rating: 4.9,
    reviews: 450,
    emergency: false,
    warranty: 'Event Day',
    features: ['Traditional Rituals', 'Custom Packages', 'Experienced Team', 'Full Coordination']
  },
  {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    description: 'Custom tailoring and premium ready-made clothing solutions',
    services: ['Custom Suits', 'Alterations', 'Ready-made Clothes', 'Designer Wear', 'Wedding Outfits', 'Formal Wear'],
    avgPrice: '₹200 - ₹5,000',
    avgTime: '3-7 days',
    popularity: 'Medium',
    providers: 32,
    rating: 4.6,
    reviews: 680,
    emergency: false,
    warranty: '30 Days',
    features: ['Premium Fabrics', 'Perfect Fit', 'Design Consultation', 'Express Service']
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    description: 'Professional AC repair, RO maintenance, and installation services',
    services: ['AC Repair', 'RO Service', 'Installation', 'Maintenance', 'Gas Filling', 'Filter Replacement'],
    avgPrice: '₹800 - ₹3,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 28,
    rating: 4.5,
    reviews: 750,
    emergency: true,
    warranty: '1 Year',
    features: ['Brand Authorized', 'Genuine Parts', 'Energy Efficient', 'Regular Maintenance']
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    description: 'Professional hair styling, facials, and beauty treatments',
    services: ['Hair Cut & Style', 'Facial Treatment', 'Manicure & Pedicure', 'Bridal Makeup', 'Spa Services', 'Hair Color'],
    avgPrice: '₹500 - ₹2,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 42,
    rating: 4.8,
    reviews: 1100,
    emergency: false,
    warranty: '7 Days',
    features: ['Expert Stylists', 'Premium Products', 'Hygienic Tools', 'Home Service']
  }
];

// Popular services in your area
const popularServices = [
  {
    id: 1,
    name: 'Emergency Electrician',
    category: 'Electrician',
    description: '24/7 emergency electrical services with licensed professionals',
    price: '₹800 - ₹1,500',
    rating: 4.9,
    reviews: 127,
    distance: '0.5 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    features: ['24/7 Available', 'Licensed Electricians', 'Same Day Service', 'Safety Certified'],
    timeEstimate: '30-60 mins',
    warranty: '1 Year'
  },
  {
    id: 2,
    name: 'AC Repair & Service',
    category: 'RO & AC Services',
    description: 'Professional AC repair and maintenance with genuine parts',
    price: '₹1,200 - ₹2,500',
    rating: 4.7,
    reviews: 89,
    distance: '1.2 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    features: ['Brand Authorized', 'Genuine Parts', 'Energy Efficient', 'Regular Maintenance'],
    timeEstimate: '2-3 hours',
    warranty: '1 Year'
  },
  {
    id: 3,
    name: 'Wedding Pandit Booking',
    category: 'Wedding Services',
    description: 'Traditional wedding ceremonies and rituals with experienced pandits',
    price: '₹3,000 - ₹8,000',
    rating: 4.9,
    reviews: 156,
    distance: '2.1 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    features: ['Traditional Rituals', 'Experienced Pandits', 'Custom Packages', 'Full Coordination'],
    timeEstimate: '2-4 hours',
    warranty: 'Event Day'
  },
  {
    id: 4,
    name: 'Plumbing Emergency',
    category: 'Plumber',
    description: '24/7 emergency plumbing services for urgent repairs',
    price: '₹500 - ₹1,200',
    rating: 4.8,
    reviews: 203,
    distance: '0.8 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6c4?w=400&h=300&fit=crop',
    features: ['24/7 Emergency', 'Same Day Service', 'Modern Tools', 'Clean Work'],
    timeEstimate: '45-90 mins',
    warranty: '6 Months'
  },
  {
    id: 5,
    name: 'Beauty & Hair Styling',
    category: 'Beauty & Wellness',
    description: 'Professional hair styling and beauty treatments at home',
    price: '₹800 - ₹2,000',
    rating: 4.9,
    reviews: 145,
    distance: '1.5 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    features: ['Expert Stylists', 'Premium Products', 'Home Service', 'Hygienic Tools'],
    timeEstimate: '1-2 hours',
    warranty: '7 Days'
  },
  {
    id: 6,
    name: 'Custom Tailoring',
    category: 'Cloth Shop & Tailor',
    description: 'Premium custom tailoring with perfect fit guarantee',
    price: '₹1,500 - ₹4,000',
    rating: 4.7,
    reviews: 98,
    distance: '2.3 km',
    available: true,
    image: 'https://images.unsplash.com/photo-1594736797933-d0c29d0b8c22?w=400&h=300&fit=crop',
    features: ['Premium Fabrics', 'Perfect Fit', 'Design Consultation', 'Express Service'],
    timeEstimate: '3-7 days',
    warranty: '30 Days'
  }
];

// Service benefits and features
const serviceBenefits = [
  {
    icon: ShieldCheckIcon,
    title: '100% Verified Professionals',
    description: 'All our service providers are background verified and skill tested',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ClockIcon,
    title: 'Same Day Service',
    description: 'Most services available on the same day with instant booking',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'No hidden charges. Get upfront pricing before booking',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: StarIcon,
    title: 'Quality Guarantee',
    description: 'Satisfaction guaranteed with our quality assurance program',
    color: 'from-yellow-500 to-orange-500'
  }
];

// Service areas and coverage
const serviceAreas = [
  { city: 'Delhi', providers: 45, rating: 4.8, popular: true },
  { city: 'Mumbai', providers: 38, rating: 4.7, popular: true },
  { city: 'Bangalore', providers: 32, rating: 4.9, popular: true },
  { city: 'Chennai', providers: 28, rating: 4.6, popular: false },
  { city: 'Hyderabad', providers: 25, rating: 4.8, popular: false },
  { city: 'Pune', providers: 22, rating: 4.7, popular: false },
  { city: 'Kolkata', providers: 20, rating: 4.5, popular: false },
  { city: 'Ahmedabad', providers: 18, rating: 4.6, popular: false }
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium & Service-Focused */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <FireIconSolid className="h-5 w-5 mr-2 text-orange-400" />
            <span className="text-sm font-medium text-white">Professional Services Platform</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Discover & Book
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Professional Services
              </span>
            </h1>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Browse our comprehensive range of verified local services. From emergency repairs to special events, find the perfect professional for your needs.
          </p>
          
          {/* Premium Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-3 shadow-2xl border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div className="sm:w-64 relative">
                  <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  Search Services <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center text-blue-100">
              <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
              <span className="font-medium">200+ Verified Professionals</span>
            </div>
            <div className="flex items-center text-blue-100">
              <ClockIcon className="h-5 w-5 mr-2 text-blue-400" />
              <span className="font-medium">Same Day Service Available</span>
            </div>
            <div className="flex items-center text-blue-100">
              <StarIcon className="h-5 w-5 mr-2 text-yellow-400" />
              <span className="font-medium">4.8★ Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-6 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <FireIconSolid className="h-6 w-6 text-white" />
            <p className="text-white font-semibold text-lg">
              🎉 New User Special: Get 20% OFF on your first booking! Use code: WELCOME20
            </p>
            <FireIconSolid className="h-6 w-6 text-white" />
          </div>
        </div>
      </section>

      {/* Service Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the highest quality services with complete peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Service Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of professional services
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setSelectedCategory('popular')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'popular'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
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
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 group cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`${category.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${category.iconColor}`} />
                    </div>
                    <div className="flex flex-col items-end">
                      {category.emergency && (
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                          <FireIconSolid className="h-3 w-3 inline mr-1" />
                          24/7 Emergency
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        category.popularity === 'High' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {category.popularity} Demand
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
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

                  {/* Features */}
                  <div className="mb-6">
                    <div className="space-y-2">
                      {category.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircleIconSolidFill className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.providers}</div>
                      <div className="text-xs text-gray-600">Providers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.rating}★</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.reviews}</div>
                      <div className="text-xs text-gray-600">Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{category.warranty}</div>
                      <div className="text-xs text-gray-600">Warranty</div>
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Services in <span className="text-blue-600">{userLocation}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These are the most booked services in your area right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
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
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {service.distance}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {service.timeEstimate}
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
                      href={`/book?service=${service.name}&category=${service.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Areas Coverage */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Serve Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our verified professionals are available in major cities across the country
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 text-center">
                <div className="text-lg font-bold text-gray-900 mb-1">{area.city}</div>
                <div className="text-sm text-gray-600 mb-2">{area.providers} providers</div>
                <div className="flex items-center justify-center mb-2">
                  <StarIconSolid className="h-3 w-3 text-yellow-400 mr-1" />
                  <span className="text-xs text-gray-600">{area.rating}</span>
                </div>
                {area.popular && (
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
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