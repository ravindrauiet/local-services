'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  HeartIcon,
  ScissorsIcon,
  CogIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Service category data
const serviceCategories = {
  electrician: {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    description: 'Professional electrical services for your home and office. From basic repairs to complete installations, our verified electricians provide safe and reliable solutions.',
    services: [
      { name: 'Home Wiring', description: 'Complete home electrical wiring and rewiring', price: '₹1,500 - ₹5,000', time: '4-8 hours' },
      { name: 'Switch & Socket Installation', description: 'Installation of switches, sockets, and electrical points', price: '₹200 - ₹500', time: '1-2 hours' },
      { name: 'Fan & Light Installation', description: 'Ceiling fan and light fixture installation', price: '₹300 - ₹800', time: '1-3 hours' },
      { name: 'MCB & RCCB Installation', description: 'Circuit breaker and safety device installation', price: '₹500 - ₹1,500', time: '2-4 hours' },
      { name: 'Emergency Repairs', description: '24/7 emergency electrical repair services', price: '₹800 - ₹2,000', time: '1-3 hours' },
      { name: 'Electrical Inspection', description: 'Complete electrical safety inspection', price: '₹1,000 - ₹2,500', time: '2-4 hours' }
    ],
    avgPrice: '₹500 - ₹2,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 45,
    rating: 4.8,
    features: [
      'Licensed & Certified Electricians',
      '24/7 Emergency Services',
      'Quality Materials Used',
      'Safety Guaranteed',
      'Warranty on Work'
    ]
  },
  plumber: {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    description: 'Expert plumbing services for all your water and drainage needs. Our certified plumbers provide reliable solutions for homes and businesses.',
    services: [
      { name: 'Pipe Repair & Replacement', description: 'Fix leaking pipes and replace damaged sections', price: '₹300 - ₹1,200', time: '1-3 hours' },
      { name: 'Tap & Faucet Installation', description: 'Install new taps, faucets, and bathroom fittings', price: '₹200 - ₹800', time: '1-2 hours' },
      { name: 'Bathroom Fitting', description: 'Complete bathroom plumbing and fitting services', price: '₹1,500 - ₹5,000', time: '4-8 hours' },
      { name: 'Water Tank Cleaning', description: 'Professional water tank cleaning and maintenance', price: '₹800 - ₹2,000', time: '2-4 hours' },
      { name: 'Drain Cleaning', description: 'Blocked drain cleaning and maintenance', price: '₹500 - ₹1,500', time: '1-3 hours' },
      { name: 'Emergency Repairs', description: '24/7 emergency plumbing repair services', price: '₹600 - ₹2,000', time: '1-2 hours' }
    ],
    avgPrice: '₹300 - ₹1,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 38,
    rating: 4.7,
    features: [
      'Certified Plumbers',
      'Modern Tools & Equipment',
      'Quality Materials',
      'Emergency Services',
      'Work Guarantee'
    ]
  },
  'wedding-services': {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    description: 'Complete wedding planning and arrangements to make your special day perfect. From pandit booking to decorations, we handle everything.',
    services: [
      { name: 'Pandit Booking', description: 'Traditional wedding ceremonies and rituals', price: '₹3,000 - ₹8,000', time: '4-8 hours' },
      { name: 'Samagri Supply', description: 'Complete wedding samagri and puja materials', price: '₹2,000 - ₹5,000', time: '1 day' },
      { name: 'Wedding Decorations', description: 'Beautiful wedding venue decorations', price: '₹5,000 - ₹20,000', time: '1-2 days' },
      { name: 'Event Management', description: 'Complete wedding event management', price: '₹15,000 - ₹50,000', time: '1-3 days' },
      { name: 'Photography Services', description: 'Professional wedding photography', price: '₹8,000 - ₹25,000', time: 'Full day' },
      { name: 'Catering Arrangements', description: 'Wedding catering and food arrangements', price: '₹200 - ₹500 per plate', time: '1-2 days' }
    ],
    avgPrice: '₹15,000 - ₹50,000',
    avgTime: '1-2 days',
    popularity: 'Medium',
    providers: 25,
    rating: 4.9,
    features: [
      'Traditional & Modern Services',
      'Experienced Wedding Planners',
      'Custom Packages',
      'Quality Vendors',
      'Stress-Free Planning'
    ]
  },
  tailor: {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    description: 'Professional tailoring services for men and women. Custom suits, alterations, and ready-made clothing with premium quality.',
    services: [
      { name: 'Custom Suits', description: 'Tailored suits for men and women', price: '₹2,000 - ₹8,000', time: '7-15 days' },
      { name: 'Alterations', description: 'Clothing alterations and modifications', price: '₹200 - ₹1,000', time: '2-5 days' },
      { name: 'Ready-made Clothes', description: 'Quality ready-made clothing', price: '₹500 - ₹3,000', time: 'Immediate' },
      { name: 'Wedding Outfits', description: 'Special wedding and party wear', price: '₹3,000 - ₹15,000', time: '10-20 days' },
      { name: 'Designer Wear', description: 'Custom designer clothing', price: '₹5,000 - ₹25,000', time: '15-30 days' },
      { name: 'Uniform Stitching', description: 'School and office uniforms', price: '₹800 - ₹2,500', time: '5-10 days' }
    ],
    avgPrice: '₹200 - ₹5,000',
    avgTime: '3-7 days',
    popularity: 'Medium',
    providers: 32,
    rating: 4.6,
    features: [
      'Expert Tailors',
      'Quality Fabrics',
      'Perfect Fitting',
      'Timely Delivery',
      'Satisfaction Guarantee'
    ]
  },
  'ro-ac': {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    description: 'Professional AC repair, RO maintenance, and installation services. Keep your appliances running smoothly with our expert technicians.',
    services: [
      { name: 'AC Repair & Service', description: 'AC repair, maintenance, and servicing', price: '₹800 - ₹2,500', time: '2-4 hours' },
      { name: 'RO Water Purifier Service', description: 'RO purifier installation and maintenance', price: '₹1,200 - ₹3,000', time: '2-3 hours' },
      { name: 'AC Installation', description: 'New AC installation and setup', price: '₹2,000 - ₹5,000', time: '3-5 hours' },
      { name: 'Gas Filling', description: 'AC gas filling and leak repair', price: '₹1,500 - ₹3,500', time: '1-2 hours' },
      { name: 'Filter Replacement', description: 'AC and RO filter replacement', price: '₹500 - ₹1,500', time: '1 hour' },
      { name: 'Maintenance Contract', description: 'Annual maintenance contracts', price: '₹3,000 - ₹8,000', time: 'Ongoing' }
    ],
    avgPrice: '₹800 - ₹3,000',
    avgTime: '2-4 hours',
    popularity: 'High',
    providers: 28,
    rating: 4.5,
    features: [
      'Certified Technicians',
      'Genuine Parts',
      'Warranty on Service',
      'Emergency Repairs',
      'Maintenance Contracts'
    ]
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    description: 'Full-service beauty salon offering haircuts, styling, facials, and other beauty treatments with modern equipment and techniques.',
    services: [
      { name: 'Hair Cut & Style', description: 'Professional haircuts and styling', price: '₹300 - ₹1,500', time: '1-2 hours' },
      { name: 'Facial Treatment', description: 'Rejuvenating facial treatments', price: '₹800 - ₹2,500', time: '1-2 hours' },
      { name: 'Manicure & Pedicure', description: 'Nail care and grooming services', price: '₹500 - ₹1,500', time: '1-2 hours' },
      { name: 'Bridal Makeup', description: 'Professional bridal makeup services', price: '₹3,000 - ₹8,000', time: '3-5 hours' },
      { name: 'Spa Services', description: 'Relaxing spa and wellness treatments', price: '₹1,500 - ₹4,000', time: '2-4 hours' },
      { name: 'Hair Coloring', description: 'Professional hair coloring services', price: '₹1,000 - ₹3,000', time: '2-4 hours' }
    ],
    avgPrice: '₹500 - ₹2,500',
    avgTime: '1-3 hours',
    popularity: 'High',
    providers: 42,
    rating: 4.8,
    features: [
      'Professional Stylists',
      'Modern Equipment',
      'Quality Products',
      'Hygienic Environment',
      'Satisfaction Guarantee'
    ]
  }
};

// Sample providers for this category
const getCategoryProviders = (categoryId: string) => {
  const providers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      businessName: 'Rajesh Electrical Services',
      rating: 4.8,
      reviews: 127,
      experience: '10+ years',
      price: '₹500 - ₹2,000',
      distance: '0.5 km',
      specialties: ['Home Wiring', 'Emergency Repairs'],
      available: true
    },
    {
      id: '2',
      name: 'Amit Sharma',
      businessName: 'Sharma Plumbing Works',
      rating: 4.6,
      reviews: 89,
      experience: '8+ years',
      price: '₹300 - ₹1,500',
      distance: '1.2 km',
      specialties: ['Pipe Repair', 'Installations'],
      available: true
    },
    {
      id: '3',
      name: 'Priya Singh',
      businessName: 'Priya Wedding Services',
      rating: 4.9,
      reviews: 156,
      experience: '12+ years',
      price: '₹15,000 - ₹50,000',
      distance: '2.1 km',
      specialties: ['Wedding Planning', 'Decorations'],
      available: true
    }
  ];
  
  return providers.slice(0, 3); // Return first 3 providers
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const category = serviceCategories[categoryId as keyof typeof serviceCategories];
  const providers = getCategoryProviders(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The service category you're looking for doesn't exist.</p>
          <Link
            href="/services"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${category.color} overflow-hidden`}>
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {category.name} <span className="text-yellow-300">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{category.providers}+</div>
                <div className="text-sm text-white/80">Verified Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{category.rating}★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{category.avgTime}</div>
                <div className="text-sm text-white/80">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{category.avgPrice}</div>
                <div className="text-sm text-white/80">Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Services Offered */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {category.name} Services We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of {category.name.toLowerCase()} services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Price</div>
                    <div className="text-sm font-semibold text-gray-900">{service.price}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-sm font-semibold text-gray-900">{service.time}</div>
                  </div>
                </div>
                
                <Link
                  href={`/book?service=${service.name}&category=${category.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg block"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Top Providers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top {category.name} Providers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our verified and highly-rated {category.name.toLowerCase()} professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-r ${category.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.businessName}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <StarIconSolid className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold text-gray-900">{provider.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({provider.reviews} reviews)</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Experience</div>
                    <div className="text-sm font-semibold text-gray-900">{provider.experience}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Distance</div>
                    <div className="text-sm font-semibold text-gray-900">{provider.distance}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Specialties:</div>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Starting from</div>
                    <div className="font-bold text-lg text-gray-900">{provider.price}</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/providers/${provider.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/book?provider=${provider.id}`}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-blue-600">{category.name} Services?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We ensure the highest quality and reliability in all our {category.name.toLowerCase()} services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-br ${category.color.replace('from-', 'from-').replace('to-', 'to-')} bg-opacity-10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-12 text-center text-white`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book {category.name} Services?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get connected with verified {category.name.toLowerCase()} professionals in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Book Service Now
            </Link>
            <Link
              href="/providers"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Browse All Providers
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
