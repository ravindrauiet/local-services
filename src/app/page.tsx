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
  PlayIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  TruckIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  BuildingOfficeIcon,
  HandThumbUpIcon,
  RocketLaunchIcon,
  FireIcon,
  EyeIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  MapIcon,
  ChevronRightIcon,
  XMarkIcon,
  Bars3Icon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
  FireIcon as FireIconSolid,
  CheckCircleIcon as CheckCircleIconSolid
} from '@heroicons/react/24/solid';

const serviceCategories = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    description: 'Electrical repairs & installations',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    iconColor: 'text-yellow-600',
    popular: true,
    providers: 245,
    avgRating: 4.8,
    avgPrice: '₹500-2,000',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop'
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    description: 'Plumbing & water solutions',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    popular: true,
    providers: 189,
    avgRating: 4.7,
    avgPrice: '₹300-1,500',
    image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=300&h=200&fit=crop'
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    description: 'Complete wedding solutions',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    iconColor: 'text-pink-600',
    popular: false,
    providers: 156,
    avgRating: 4.9,
    avgPrice: '₹15,000-50,000',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop'
  },
  {
    id: 'tailor',
    name: 'Tailor',
    icon: ScissorsIcon,
    description: 'Custom clothing & alterations',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    iconColor: 'text-purple-600',
    popular: false,
    providers: 203,
    avgRating: 4.6,
    avgPrice: '₹200-5,000',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop'
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    description: 'Appliance maintenance',
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50',
    iconColor: 'text-teal-600',
    popular: true,
    providers: 178,
    avgRating: 4.5,
    avgPrice: '₹800-3,000',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=300&h=200&fit=crop'
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    description: 'Salon & spa services',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    iconColor: 'text-rose-600',
    popular: false,
    providers: 234,
    avgRating: 4.8,
    avgPrice: '₹500-2,500',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop'
  }
];

const featuredServices = [
  {
    id: 'electrician',
    name: 'Electrician Services',
    description: 'Professional electrical repairs, installations & maintenance',
    price: 'Starting from ₹299',
    time: '60 minutes',
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
    features: ['Free consultation', 'Same day service', '1 year warranty'],
    popular: true
  },
  {
    id: 'plumber',
    name: 'Plumbing Services',
    description: 'Expert plumbing solutions for all your water needs',
    price: 'Starting from ₹249',
    time: '45 minutes',
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=300&fit=crop',
    features: ['Emergency service', 'Material included', 'Quality guarantee'],
    popular: true
  },
  {
    id: 'ac-service',
    name: 'AC Service & Repair',
    description: 'Complete AC maintenance, repair & installation',
    price: 'Starting from ₹399',
    time: '90 minutes',
    rating: 4.6,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop',
    features: ['Deep cleaning', 'Gas refill', '6 months warranty'],
    popular: false
  }
];

const stats = [
  { number: '50K+', label: 'Happy Customers', icon: UsersIcon, color: 'text-blue-600' },
  { number: '1,200+', label: 'Expert Professionals', icon: UserGroupIcon, color: 'text-green-600' },
  { number: '25+', label: 'Cities Covered', icon: MapIcon, color: 'text-purple-600' },
  { number: '4.8★', label: 'Average Rating', icon: StarIcon, color: 'text-yellow-600' }
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Noida',
    rating: 5,
    text: 'Amazing service! The electrician was professional and fixed my issue within 30 minutes. Highly recommended!',
    service: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    verified: true
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Best plumbing service in the city. Quick response, fair pricing, and excellent work quality.',
    service: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    verified: true
  },
  {
    id: 3,
    name: 'Anita Singh',
    location: 'Gurgaon',
    rating: 5,
    text: 'The wedding services team made our special day perfect. Everything was organized beautifully!',
    service: 'Wedding Services',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    verified: true
  }
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Verified Professionals',
    description: 'All service providers are background verified and skilled',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ClockIcon,
    title: '60-Minute Service',
    description: 'Get service within 60 minutes of booking',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'No hidden charges, pay only for what you get',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: StarIcon,
    title: 'Quality Guarantee',
    description: '100% satisfaction guarantee on all services',
    color: 'from-yellow-500 to-orange-500'
  }
];

const howItWorks = [
  {
    step: '01',
    title: 'Tell Us What You Need',
    description: 'Describe your service requirement and location',
    icon: '📝'
  },
  {
    step: '02',
    title: 'Get Matched Instantly',
    description: 'We connect you with verified professionals nearby',
    icon: '⚡'
  },
  {
    step: '03',
    title: 'Book & Pay Securely',
    description: 'Choose your preferred time and pay safely online',
    icon: '💳'
  },
  {
    step: '04',
    title: 'Get Quality Service',
    description: 'Enjoy professional service with satisfaction guarantee',
    icon: '✅'
  }
];

const faqs = [
  {
    question: 'How quickly can I get service?',
    answer: 'Most services are available within 60 minutes of booking. Emergency services can be arranged even faster.'
  },
  {
    question: 'Are the professionals verified?',
    answer: 'Yes, all our professionals undergo background verification, skill assessment, and are regularly monitored for quality.'
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We offer 100% satisfaction guarantee. If you\'re not happy, we\'ll make it right or provide a full refund.'
  },
  {
    question: 'How do I know the pricing is fair?',
    answer: 'Our pricing is transparent and competitive. You\'ll see the exact cost before booking, with no hidden charges.'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium Service Focus */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <FireIconSolid className="h-5 w-5 mr-2 text-orange-400" />
              <span className="text-sm font-medium text-white">India's #1 Mithila Shilpi Platform</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get Professional Services
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                At Your Doorstep
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Book verified professionals for all your home and business needs. From electricians to wedding planners, get quality service in just 60 minutes.
            </p>

            {/* Search Bar - Premium Style */}
            <div className="max-w-3xl mx-auto mb-10">
              <div className="bg-white rounded-2xl p-2 shadow-2xl border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  <div className="sm:w-64 relative">
                    <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                    />
                  </div>
                  <Link
                    href="/book"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    Book Now
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center text-blue-100">
                <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
                <span className="font-medium">100% Verified Professionals</span>
              </div>
              <div className="flex items-center text-blue-100">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span className="font-medium">60-Minute Service Guarantee</span>
              </div>
              <div className="flex items-center text-blue-100">
                <StarIcon className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="font-medium">4.8★ Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services - Premium Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book these popular services and get professional help at your doorstep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                {service.popular && (
                  <div className="absolute z-10 -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    <FireIconSolid className="h-3 w-3" />
                  </div>
                )}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center mb-2">
                      <StarIconSolid className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-gray-300 ml-2">({service.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                      <div className="text-sm text-gray-500">Service time: {service.time}</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={`/book?service=${service.name}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
                  >
                    Book This Service
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* All Services Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">All Services</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
              <Link
                key={category.id}
                  href={`/services?category=${category.id}`}
                  className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {category.popular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                      <FireIconSolid className="h-3 w-3" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                  {category.description}
                </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <StarIconSolid className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-gray-600">{category.avgRating}</span>
                    </div>
                    <span className="text-gray-500">{category.providers}+</span>
                  </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Mithila Shilpi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make getting services simple, safe, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service-Specific Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Service Information
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Areas */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Service Areas</h3>
              <div className="space-y-3">
            <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">25+ Cities</div>
                  <div className="text-sm text-gray-600">Across India</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Major Cities:</strong> Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Gurgaon, Noida
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Expanding to:</strong> Jaipur, Chandigarh, Indore, Bhopal, Lucknow
                </div>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Service Hours</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 mb-2">Regular Services</div>
                  <div className="text-sm text-gray-600">7 AM - 10 PM</div>
                  <div className="text-sm text-gray-600">Monday to Sunday</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600 mb-2">Emergency Services</div>
                  <div className="text-sm text-gray-600">24/7 Available</div>
                  <div className="text-sm text-gray-600">For urgent needs</div>
                </div>
              </div>
            </div>

            {/* Service Types */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CogIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Service Types</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Installation & Setup</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Repair & Maintenance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Emergency Services</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Preventive Care</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Consultation</span>
                </div>
              </div>
            </div>

            {/* Emergency Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PhoneIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Emergency Services</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600 mb-2">24/7 Available</div>
                  <div className="text-sm text-gray-600">For urgent needs</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Emergency Types:</strong> Electrical faults, Water leaks, AC breakdown, Plumbing emergencies
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">Call: 1800-MITHILA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Payment Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing & Payment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing and flexible payment options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pricing Calculator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Pricing Calculator</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">₹299 - ₹2,000</div>
                  <div className="text-sm text-gray-600">Starting prices</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Factors:</strong> Service type, location, complexity, materials needed
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Calculate Price
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BanknotesIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Payment Methods</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Credit/Debit Cards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>UPI Payments</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Net Banking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Digital Wallets</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Cash on Service</span>
                </div>
              </div>
            </div>

            {/* Insurance Coverage */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Insurance Coverage</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-600 mb-2">₹5 Lakh Coverage</div>
                  <div className="text-sm text-gray-600">Per service</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Covered:</strong> Service damage, accidental damage, material defects
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Warranty:</strong> 1 year on all services
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <XMarkIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Cancellation Policy</h3>
              <div className="space-y-3">
            <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 mb-2">Free Cancellation</div>
                  <div className="text-sm text-gray-600">Up to 2 hours before</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Refund:</strong> 100% refund for cancellations
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Rescheduling:</strong> Free rescheduling available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our verified and trained service professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Provider Profiles */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Provider Profiles</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1,200+</div>
                  <div className="text-sm text-gray-600">Verified Professionals</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Featured:</strong> Top-rated professionals with 4.8+ ratings
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Experience:</strong> 5+ years average experience
                </div>
              </div>
            </div>

            {/* Verification Process */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Verification Process</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Background Check</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Skill Assessment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Document Verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Reference Check</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Continuous Monitoring</span>
                </div>
              </div>
            </div>

            {/* Provider Training */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AcademicCapIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Provider Training</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Technical Skills</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Safety Protocols</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Customer Service</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Quality Standards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIconSolid className="h-4 w-4 text-green-500 mr-2" />
                  <span>Regular Updates</span>
                </div>
              </div>
            </div>

            {/* Provider Reviews */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Provider Reviews</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">4.8★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Reviews:</strong> 10,000+ verified customer reviews
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Quality:</strong> 99.2% satisfaction rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get professional service in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their service needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <div className="ml-auto">
                      <CheckCircleIconSolid className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.service}</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Service Focused */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Professional Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your service now and get professional help at your doorstep in just 60 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center"
            >
              Book a Service Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/providers"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}