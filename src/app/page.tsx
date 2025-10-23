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
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid';

const serviceCategories = [
  {
    id: 'electrician',
    name: 'Electricians',
    icon: BoltIcon,
    description: 'Electrical repairs, installations, and maintenance',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    iconColor: 'text-yellow-600',
    popular: true
  },
  {
    id: 'plumber',
    name: 'Plumbers',
    icon: WrenchScrewdriverIcon,
    description: 'Plumbing repairs, installations, and maintenance',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    popular: true
  },
  {
    id: 'wedding',
    name: 'Wedding Services',
    icon: HeartIcon,
    description: 'Pandits, samagri, and wedding arrangements',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
    iconColor: 'text-pink-600',
    popular: false
  },
  {
    id: 'tailor',
    name: 'Cloth Shops & Tailors',
    icon: ScissorsIcon,
    description: 'Clothing, alterations, and custom tailoring',
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    iconColor: 'text-purple-600',
    popular: false
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    description: 'Water purifier and air conditioner services',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
    popular: true
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    description: 'Salon, spa, and wellness services',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    iconColor: 'text-rose-600',
    popular: false
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Noida',
    rating: 5,
    text: 'Amazing service! The electrician was professional and fixed my issue within 30 minutes. Highly recommended!',
    service: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Best plumbing service in the city. Quick response, fair pricing, and excellent work quality.',
    service: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Anita Singh',
    location: 'Gurgaon',
    rating: 5,
    text: 'The wedding services team made our special day perfect. Everything was organized beautifully!',
    service: 'Wedding Services',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Verified Professionals',
    description: 'All service providers are background verified and skilled'
  },
  {
    icon: ClockIcon,
    title: 'Quick Service',
    description: 'Get service within 60 minutes of booking'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'No hidden charges, pay only for what you get'
  },
  {
    icon: StarIcon,
    title: 'Quality Guarantee',
    description: '100% satisfaction guarantee on all services'
  }
];

const stats = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '1000+', label: 'Expert Professionals' },
  { number: '25+', label: 'Cities Covered' },
  { number: '4.8★', label: 'Average Rating' }
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

const pricingInfo = [
  {
    service: 'Electrician',
    price: '₹299',
    duration: 'per hour',
    features: ['Free consultation', 'Quality guarantee', 'Same day service']
  },
  {
    service: 'Plumber',
    price: '₹249',
    duration: 'per hour',
    features: ['Emergency service', 'Material included', '1 year warranty']
  },
  {
    service: 'AC Service',
    price: '₹399',
    duration: 'per service',
    features: ['Deep cleaning', 'Gas refill', '6 months warranty']
  }
];

const trustIndicators = [
  {
    icon: ShieldCheckIcon,
    title: '100% Verified',
    description: 'All professionals are background verified and skilled'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Pricing',
    description: 'No hidden charges, pay only for what you get'
  },
  {
    icon: ClockIcon,
    title: 'On-Time Service',
    description: 'Guaranteed service within your chosen time slot'
  },
  {
    icon: StarIcon,
    title: 'Quality Assured',
    description: '100% satisfaction guarantee on all services'
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

const blogPosts = [
  {
    title: '5 Signs You Need an Electrician Immediately',
    excerpt: 'Learn to identify electrical problems that require immediate professional attention.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop',
    category: 'Electrical',
    readTime: '3 min read'
  },
  {
    title: 'How to Choose the Right Plumber',
    excerpt: 'Essential tips for selecting a reliable and skilled plumbing professional.',
    image: 'https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?w=400&h=250&fit=crop',
    category: 'Plumbing',
    readTime: '4 min read'
  },
  {
    title: 'AC Maintenance Tips for Summer',
    excerpt: 'Keep your air conditioner running efficiently with these expert maintenance tips.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=250&fit=crop',
    category: 'AC Service',
    readTime: '5 min read'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <SparklesIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">India's #1 Local Services Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Get Any Service
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  At Your Doorstep
                </span>
            </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From electricians to wedding planners, find trusted professionals for all your home and business needs. Book in 60 seconds, get service in 60 minutes.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-blue-100">
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">100% Verified Professionals</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">60-Minute Service Guarantee</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <StarIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">4.8★ Average Rating</span>
                </div>
              </div>
            
            {/* Search Bar */}
              <div className="bg-white rounded-2xl p-2 shadow-2xl mb-8">
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
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Search
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Video/Image */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center">
                  <button className="bg-white/20 hover:bg-white/30 rounded-full p-6 transition-all duration-300 transform hover:scale-110">
                    <PlayIcon className="h-12 w-12 text-white" />
                </button>
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4 shadow-lg">
                  <HeartIconSolid className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-8 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <SparklesIcon className="h-6 w-6 text-white" />
            <p className="text-white font-semibold text-lg">
              🎉 New User Special: Get 20% OFF on your first booking! Use code: WELCOME20
            </p>
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of professional services, all available at your convenience
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                ✓ Same Day Service
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                ✓ Quality Guaranteed
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                ✓ Transparent Pricing
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
              <Link
                key={category.id}
                  href={`/services?category=${category.id}`}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  {category.popular && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Book Now</span>
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
              Why Choose Us?
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
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
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

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden charges, no surprises. Pay only for what you get.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingInfo.map((pricing, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pricing.service}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-blue-600">{pricing.price}</span>
                    <span className="text-gray-600 ml-2">{pricing.duration}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pricing.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your safety and satisfaction are our top priorities
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{indicator.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{indicator.description}</p>
                </div>
              );
            })}
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

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Tips & Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert advice and tips for maintaining your home and appliances
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of customers who trust us for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Book a Service
            </Link>
            <Link
              href="/providers"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
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