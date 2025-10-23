'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Enhanced mock data with more details
const mockProvider = {
  id: '3',
  name: 'Priya Singh',
  businessName: 'Priya Wedding Services',
  serviceType: 'Wedding Services',
  address: 'Sector 22, Noida, Uttar Pradesh 201301',
  phone: '+91 98765 43212',
  email: 'priya@weddingservices.com',
  rating: 4.9,
  totalReviews: 156,
  description: 'Complete wedding services including pandit booking, samagri, decorations, and event management. With over 12 years of experience, I have successfully organized more than 500+ weddings across Delhi NCR. Specializing in traditional Hindu weddings, I ensure every detail is perfect for your special day.',
  experience: '12+ years',
  services: [
    'Pandit Booking & Arrangements',
    'Complete Samagri Supply',
    'Wedding Decorations',
    'Event Management',
    'Photography Coordination',
    'Catering Arrangements',
    'Guest Management',
    'Traditional Rituals'
  ],
  workingHours: '9:00 AM - 8:00 PM (Mon-Sat)',
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  isApproved: true,
  price: '₹15,000 - ₹50,000',
  responseTime: '2 hours',
  verified: true,
  completedWeddings: 500,
  specialties: ['Traditional Hindu Weddings', 'Destination Weddings', 'Intimate Ceremonies'],
  languages: ['Hindi', 'English', 'Punjabi']
};

const mockReviews = [
  {
    id: '1',
    customerName: 'Rajesh & Priya Sharma',
    rating: 5,
    comment: 'Priya made our wedding absolutely perfect! Every detail was taken care of with such precision and love. The decorations were stunning, and the pandit ji was excellent. Highly recommended for anyone planning their special day.',
    date: '2024-01-15',
    service: 'Complete Wedding Arrangement',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '2',
    customerName: 'Amit & Sunita Singh',
    rating: 5,
    comment: 'Outstanding service! Priya coordinated everything beautifully. From samagri to decorations, everything was perfect. Our guests were amazed by the arrangements. Thank you for making our day memorable.',
    date: '2024-01-10',
    service: 'Wedding Decoration & Management',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '3',
    customerName: 'Vikram & Anita Gupta',
    rating: 4,
    comment: 'Very professional and organized. Priya handled all the wedding arrangements smoothly. The pandit booking was perfect, and the samagri was of excellent quality. Would definitely recommend.',
    date: '2024-01-05',
    service: 'Pandit & Samagri Services',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '4',
    customerName: 'Rohit & Kavya Patel',
    rating: 5,
    comment: 'Amazing experience! Priya\'s attention to detail is incredible. She made our intimate ceremony feel like a grand celebration. The decorations were beautiful and the coordination was flawless.',
    date: '2023-12-28',
    service: 'Intimate Wedding Ceremony',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face'
  }
];

const serviceIcons = {
  'Wedding Services': HeartIcon,
  'Electrician': BoltIcon,
  'Plumber': WrenchScrewdriverIcon,
  'Cloth Shop & Tailor': ScissorsIcon,
  'RO & AC Services': CogIcon,
  'Beauty & Wellness': SparklesIcon
};

export default function ProviderDetailPage() {
  const params = useParams();
  const providerId = params.id as string;
  const [provider, setProvider] = useState(mockProvider);
  const [reviews, setReviews] = useState(mockReviews);
  const [selectedTab, setSelectedTab] = useState('about');

  const ServiceIcon = serviceIcons[provider.serviceType as keyof typeof serviceIcons] || SparklesIcon;

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

  const tabs = [
    { id: 'about', label: 'About', icon: UserGroupIcon },
    { id: 'services', label: 'Services', icon: CheckCircleIcon },
    { id: 'reviews', label: 'Reviews', icon: ChatBubbleLeftRightIcon },
    { id: 'contact', label: 'Contact', icon: PhoneIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Services
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
                  <ServiceIcon className="h-10 w-10 text-white" />
                </div>
                <div>
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
                  <h1 className="text-4xl font-bold mb-2">{provider.name}</h1>
                  <p className="text-xl text-pink-100">{provider.businessName}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                {renderStars(provider.rating)}
                <span className="ml-4 text-pink-100">
                  {provider.totalReviews} reviews • {provider.experience} experience
                </span>
              </div>

              <p className="text-lg text-pink-100 mb-8 leading-relaxed">
                {provider.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{provider.completedWeddings}+</div>
                  <div className="text-sm text-pink-200">Weddings Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{provider.responseTime}</div>
                  <div className="text-sm text-pink-200">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{provider.rating}★</div>
                  <div className="text-sm text-pink-200">Average Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/book?provider=${provider.id}`}
                  className="bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg text-center"
                >
                  Book Service
                </Link>
                <a
                  href={`tel:${provider.phone}`}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 text-center"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Content - Provider Photo */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4 shadow-lg">
                  <HeartIconSolid className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Tab */}
            {selectedTab === 'about' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About {provider.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{provider.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
                    <ul className="space-y-2">
                      {provider.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-pink-500 mr-3" />
                          <span className="text-gray-700">{specialty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
                    <ul className="space-y-2">
                      {provider.languages.map((language, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                          <span className="text-gray-700">{language}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {selectedTab === 'services' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
                      <CheckCircleIcon className="h-6 w-6 text-pink-500 mr-4" />
                      <span className="text-gray-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{provider.rating}</div>
                    <div className="flex items-center">
                      {renderStars(provider.rating)}
                    </div>
                    <div className="text-sm text-gray-500">{provider.totalReviews} reviews</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <img
                          src={review.avatar}
                          alt={review.customerName}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {renderReviewStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-600">{review.service}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {selectedTab === 'contact' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <PhoneIcon className="h-6 w-6 text-green-500 mr-4" />
                      <div>
                        <div className="font-medium text-gray-900">Phone</div>
                        <a href={`tel:${provider.phone}`} className="text-green-600 hover:text-green-700">
                          {provider.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <EnvelopeIcon className="h-6 w-6 text-blue-500 mr-4" />
                      <div>
                        <div className="font-medium text-gray-900">Email</div>
                        <a href={`mailto:${provider.email}`} className="text-blue-600 hover:text-blue-700">
                          {provider.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <MapPinIcon className="h-6 w-6 text-purple-500 mr-4 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900">Address</div>
                        <div className="text-gray-700">{provider.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                      <ClockIcon className="h-6 w-6 text-orange-500 mr-4" />
                      <div>
                        <div className="font-medium text-gray-900">Working Hours</div>
                        <div className="text-gray-700">{provider.workingHours}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{provider.price}</div>
                <div className="text-sm text-gray-600">Starting from</div>
                <div className="mt-4 flex items-center justify-center text-green-600">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/book?provider=${provider.id}`}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-center py-3 px-4 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg block"
                >
                  Book Service
                </Link>
                <a
                  href={`tel:${provider.phone}`}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg block"
                >
                  Call Now
                </a>
                <button className="w-full border-2 border-pink-600 text-pink-600 text-center py-3 px-4 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300">
                  Send Message
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust & Safety</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Background Verified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">On-Time Service</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">4.9★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}