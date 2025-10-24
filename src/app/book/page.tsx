'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserIcon, 
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  CogIcon,
  HeartIcon,
  ShieldCheckIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Service categories with detailed information
const serviceCategories = {
  electrician: {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    description: 'Professional electrical services for your home and office',
    services: {
      'Home Wiring': { price: '₹1,500 - ₹5,000', time: '4-8 hours', description: 'Complete home electrical wiring and rewiring' },
      'Switch & Socket Installation': { price: '₹200 - ₹500', time: '1-2 hours', description: 'Installation of switches, sockets, and electrical points' },
      'Fan & Light Installation': { price: '₹300 - ₹800', time: '1-3 hours', description: 'Ceiling fan and light fixture installation' },
      'MCB & RCCB Installation': { price: '₹500 - ₹1,500', time: '2-4 hours', description: 'Circuit breaker and safety device installation' },
      'Emergency Repairs': { price: '₹800 - ₹2,000', time: '1-3 hours', description: '24/7 emergency electrical repair services' },
      'Electrical Inspection': { price: '₹1,000 - ₹2,500', time: '2-4 hours', description: 'Complete electrical safety inspection' }
    }
  },
  plumber: {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    description: 'Expert plumbing services for all your water and drainage needs',
    services: {
      'Pipe Repair & Replacement': { price: '₹300 - ₹1,200', time: '1-3 hours', description: 'Fix leaking pipes and replace damaged sections' },
      'Tap & Faucet Installation': { price: '₹200 - ₹800', time: '1-2 hours', description: 'Install new taps, faucets, and bathroom fittings' },
      'Bathroom Fitting': { price: '₹1,500 - ₹5,000', time: '4-8 hours', description: 'Complete bathroom plumbing and fitting services' },
      'Water Tank Cleaning': { price: '₹800 - ₹2,000', time: '2-4 hours', description: 'Professional water tank cleaning and maintenance' },
      'Drain Cleaning': { price: '₹500 - ₹1,500', time: '1-3 hours', description: 'Blocked drain cleaning and maintenance' },
      'Emergency Repairs': { price: '₹600 - ₹2,000', time: '1-2 hours', description: '24/7 emergency plumbing repair services' }
    }
  },
  'wedding-services': {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    description: 'Complete wedding planning and arrangements to make your special day perfect',
    services: {
      'Pandit Booking': { price: '₹3,000 - ₹8,000', time: '4-8 hours', description: 'Traditional wedding ceremonies and rituals' },
      'Samagri Supply': { price: '₹2,000 - ₹5,000', time: '1 day', description: 'Complete wedding samagri and puja materials' },
      'Wedding Decorations': { price: '₹5,000 - ₹20,000', time: '1-2 days', description: 'Beautiful wedding venue decorations' },
      'Event Management': { price: '₹15,000 - ₹50,000', time: '1-3 days', description: 'Complete wedding event management' },
      'Photography Services': { price: '₹8,000 - ₹25,000', time: 'Full day', description: 'Professional wedding photography' },
      'Catering Arrangements': { price: '₹200 - ₹500 per plate', time: '1-2 days', description: 'Wedding catering and food arrangements' }
    }
  },
  tailor: {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    description: 'Professional tailoring services for men and women',
    services: {
      'Custom Suits': { price: '₹2,000 - ₹8,000', time: '7-15 days', description: 'Tailored suits for men and women' },
      'Alterations': { price: '₹200 - ₹1,000', time: '2-5 days', description: 'Clothing alterations and modifications' },
      'Ready-made Clothes': { price: '₹500 - ₹3,000', time: 'Immediate', description: 'Quality ready-made clothing' },
      'Wedding Outfits': { price: '₹3,000 - ₹15,000', time: '10-20 days', description: 'Special wedding and party wear' },
      'Designer Wear': { price: '₹5,000 - ₹25,000', time: '15-30 days', description: 'Custom designer clothing' },
      'Uniform Stitching': { price: '₹800 - ₹2,500', time: '5-10 days', description: 'School and office uniforms' }
    }
  },
  'ro-ac': {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    description: 'Professional AC repair, RO maintenance, and installation services',
    services: {
      'AC Repair & Service': { price: '₹800 - ₹2,500', time: '2-4 hours', description: 'AC repair, maintenance, and servicing' },
      'RO Water Purifier Service': { price: '₹1,200 - ₹3,000', time: '2-3 hours', description: 'RO purifier installation and maintenance' },
      'AC Installation': { price: '₹2,000 - ₹5,000', time: '3-5 hours', description: 'New AC installation and setup' },
      'Gas Filling': { price: '₹1,500 - ₹3,500', time: '1-2 hours', description: 'AC gas filling and leak repair' },
      'Filter Replacement': { price: '₹500 - ₹1,500', time: '1 hour', description: 'AC and RO filter replacement' },
      'Maintenance Contract': { price: '₹3,000 - ₹8,000', time: 'Ongoing', description: 'Annual maintenance contracts' }
    }
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    description: 'Full-service beauty salon offering haircuts, styling, and treatments',
    services: {
      'Hair Cut & Style': { price: '₹300 - ₹1,500', time: '1-2 hours', description: 'Professional haircuts and styling' },
      'Facial Treatment': { price: '₹800 - ₹2,500', time: '1-2 hours', description: 'Rejuvenating facial treatments' },
      'Manicure & Pedicure': { price: '₹500 - ₹1,500', time: '1-2 hours', description: 'Nail care and grooming services' },
      'Bridal Makeup': { price: '₹3,000 - ₹8,000', time: '3-5 hours', description: 'Professional bridal makeup services' },
      'Spa Services': { price: '₹1,500 - ₹4,000', time: '2-4 hours', description: 'Relaxing spa and wellness treatments' },
      'Hair Coloring': { price: '₹1,000 - ₹3,000', time: '2-4 hours', description: 'Professional hair coloring services' }
    }
  }
};

// Sample providers for each category
const getCategoryProviders = (categoryId: string) => {
  const providers = {
    electrician: [
      { id: '1', name: 'Rajesh Kumar', businessName: 'Rajesh Electrical Services', rating: 4.8, reviews: 127, experience: '10+ years', specialties: ['Home Wiring', 'Emergency Repairs'], available: true },
      { id: '2', name: 'Vikram Singh', businessName: 'Vikram Electric Works', rating: 4.7, reviews: 89, experience: '8+ years', specialties: ['Switch Installation', 'MCB Repair'], available: true },
      { id: '3', name: 'Amit Sharma', businessName: 'Sharma Electrical Solutions', rating: 4.9, reviews: 156, experience: '12+ years', specialties: ['Fan Installation', 'Electrical Inspection'], available: true }
    ],
    plumber: [
      { id: '4', name: 'Ravi Kumar', businessName: 'Ravi Plumbing Works', rating: 4.6, reviews: 98, experience: '9+ years', specialties: ['Pipe Repair', 'Bathroom Fitting'], available: true },
      { id: '5', name: 'Suresh Gupta', businessName: 'Gupta Plumbing Services', rating: 4.8, reviews: 134, experience: '11+ years', specialties: ['Water Tank Cleaning', 'Emergency Repairs'], available: true }
    ],
    'wedding-services': [
      { id: '6', name: 'Priya Singh', businessName: 'Priya Wedding Services', rating: 4.9, reviews: 156, experience: '12+ years', specialties: ['Wedding Planning', 'Decorations'], available: true },
      { id: '7', name: 'Rajesh Pandit', businessName: 'Traditional Wedding Services', rating: 4.8, reviews: 89, experience: '15+ years', specialties: ['Pandit Booking', 'Samagri Supply'], available: true }
    ],
    tailor: [
      { id: '8', name: 'Vikram Tailor', businessName: 'Vikram Tailoring House', rating: 4.7, reviews: 203, experience: '15+ years', specialties: ['Custom Suits', 'Alterations'], available: true },
      { id: '9', name: 'Sunita Devi', businessName: 'Sunita Fashion House', rating: 4.6, reviews: 145, experience: '10+ years', specialties: ['Wedding Outfits', 'Designer Wear'], available: true }
    ],
    'ro-ac': [
      { id: '10', name: 'Rohit AC Services', businessName: 'Cool Air Solutions', rating: 4.5, reviews: 78, experience: '6+ years', specialties: ['AC Repair', 'RO Services'], available: true },
      { id: '11', name: 'Manoj Kumar', businessName: 'Manoj AC & RO Services', rating: 4.7, reviews: 112, experience: '8+ years', specialties: ['AC Installation', 'Maintenance'], available: true }
    ],
    beauty: [
      { id: '12', name: 'Beauty Palace', businessName: 'Beauty Palace Salon', rating: 4.8, reviews: 134, experience: '9+ years', specialties: ['Hair Styling', 'Facials'], available: true },
      { id: '13', name: 'Priya Beauty', businessName: 'Priya Beauty Studio', rating: 4.7, reviews: 98, experience: '7+ years', specialties: ['Bridal Makeup', 'Spa Services'], available: true }
    ]
  };
  
  return providers[categoryId as keyof typeof providers] || [];
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

export default function BookService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('provider');
  const serviceName = searchParams.get('service');
  const categoryId = searchParams.get('category');
  
  const [currentStep, setCurrentStep] = useState(() => {
    // Check if we have URL parameters on initial load
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const service = urlParams.get('service');
      const category = urlParams.get('category');
      if (service && category) {
        return 2; // Start at step 2 if service is pre-selected
      }
    }
    return 1;
  });
  const [selectedService, setSelectedService] = useState<{id: string, name: string, price: string, time: string, description: string} | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<{id: string, name: string, rating: number, price: string} | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceType: '',
    serviceDate: '',
    serviceTime: '',
    location: '',
    address: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize service and provider based on URL parameters
  useEffect(() => {
    if (categoryId && serviceName) {
      const category = serviceCategories[categoryId as keyof typeof serviceCategories];
      
      if (category && category.services[serviceName as keyof typeof category.services]) {
        const serviceInfo = category.services[serviceName as keyof typeof category.services] as {price: string, time: string, description: string};
        
        setSelectedService({
          id: categoryId,
          name: serviceName,
          price: serviceInfo.price,
          time: serviceInfo.time,
          description: serviceInfo.description
        });
        setFormData(prev => ({
          ...prev,
          serviceType: serviceName
        }));
        // If service is pre-selected, go to step 2 (provider selection)
        setCurrentStep(2);
      } else {
        // Fallback: create a basic service object if not found
        if (category) {
          setSelectedService({
            id: categoryId,
            name: serviceName,
            price: 'Contact for pricing',
            time: 'Contact for timing',
            description: `${serviceName} service`
          });
          setFormData(prev => ({
            ...prev,
            serviceType: serviceName
          }));
          setCurrentStep(2);
        }
      }
    }
    
    if (providerId) {
      // Find provider in all categories
      const allProviders = Object.values(serviceCategories).flatMap(cat => 
        getCategoryProviders(cat.id)
      );
      const provider = allProviders.find(p => p.id === providerId);
      if (provider) {
        setSelectedProvider({
          id: provider.id,
          name: provider.name,
          rating: provider.rating,
          price: 'Contact for pricing'
        });
        // If provider is pre-selected, go to step 3 (booking form)
        setCurrentStep(3);
      }
    }
  }, [categoryId, serviceName, providerId]);

  // Additional useEffect to handle step transition when service is selected
  useEffect(() => {
    if (selectedService && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [selectedService, currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleProviderSelect = (provider: {id: string, name: string, rating: number, price: string}) => {
    setSelectedProvider(provider);
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically save the booking to Firestore
      // and send notifications to admin and providers
      // For now, we'll just simulate the submission
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      // Redirect to success page or show success message
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for your booking request. We&apos;ll connect you with the best service providers in your area and get back to you within 2 hours.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>What happens next?</strong><br />
              • We&apos;ll match you with verified providers<br />
              • You&apos;ll receive quotes within 2 hours<br />
              • Choose your preferred provider<br />
              • Get your service completed
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You&apos;ll be redirected to the home page shortly...
          </p>
        </div>
      </div>
    );
  }

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
              Book Your <span className="text-yellow-300">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get connected with verified service providers in your area. 
              Simple booking process, transparent pricing, and guaranteed quality.
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-yellow-300 text-blue-600' : 'bg-white/20'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Choose Service</span>
              </div>
              <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-yellow-300' : 'bg-white/20'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-yellow-300 text-blue-600' : 'bg-white/20'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Select Provider</span>
              </div>
              <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-yellow-300' : 'bg-white/20'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-yellow-300 text-blue-600' : 'bg-white/20'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Book Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Step 1: Service Selection (only if no service pre-selected) */}
        {currentStep === 1 && !selectedService && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Service
              </h2>
              <p className="text-lg text-gray-600">
                Select the service you need and we&apos;ll connect you with the best providers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(serviceCategories).map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => setCurrentStep(2)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group border-2 border-transparent hover:border-blue-200"
                  >
                    <div className={`bg-gradient-to-r ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-blue-600">
                        Browse Services
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Provider Selection */}
        {currentStep === 2 && selectedService && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Select a Provider
                  </h2>
                  <p className="text-gray-600">
                    Choose from our verified {serviceCategories[categoryId as keyof typeof serviceCategories]?.name.toLowerCase() || 'service'} professionals
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back
                </button>
              </div>

              {/* Selected Service Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                <div className="flex items-center">
                  <div className={`bg-gradient-to-r ${serviceCategories[categoryId as keyof typeof serviceCategories]?.color || 'from-blue-500 to-purple-500'} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                    <div className="h-6 w-6 text-white">📋</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedService.name}</h3>
                    <p className="text-sm text-gray-600">{selectedService.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm font-semibold text-blue-600 mr-4">{selectedService.price}</span>
                      <span className="text-sm text-gray-500">{selectedService.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Providers List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getCategoryProviders(categoryId).map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider)}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <UserGroupIcon className="h-6 w-6 text-white" />
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
                    
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {provider.specialties.map((specialty, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Experience</div>
                        <div className="text-sm font-semibold text-gray-900">{provider.experience}</div>
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Booking Form */}
        {currentStep === 3 && selectedService && selectedProvider && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Complete Your Booking
                  </h2>
                  <p className="text-gray-600">
                    Fill in your details to book the service
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back
                </button>
              </div>

              {/* Service & Provider Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${serviceCategories[categoryId as keyof typeof serviceCategories]?.color || 'from-blue-500 to-purple-500'} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                      <div className="h-6 w-6 text-white">📋</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedService.name}</h3>
                      <p className="text-sm text-gray-600">with {selectedProvider.name}</p>
                      <div className="flex items-center mt-1">
                        <StarIconSolid className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{selectedProvider.rating}</span>
                        <span className="text-sm text-gray-500 ml-2">({selectedProvider.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Estimated Price</div>
                    <div className="font-bold text-lg text-gray-900">{selectedService.price}</div>
                    <div className="text-sm text-gray-500">{selectedService.time}</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <UserIcon className="h-6 w-6 mr-3 text-blue-600" />
                    Your Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        required
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="customerEmail"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Service Schedule */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-blue-600" />
                    Service Schedule
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="serviceDate"
                        name="serviceDate"
                        required
                        min={today}
                        value={formData.serviceDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="serviceTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        id="serviceTime"
                        name="serviceTime"
                        required
                        value={formData.serviceTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-3 text-blue-600" />
                    Service Location
                  </h3>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      City/Area *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter your city or area"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Additional Information
                  </h3>
                  
                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={4}
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Any specific requirements or details about the service needed"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We&apos;ll connect you with {selectedProvider.name} and send confirmation within 2 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-blue-600">Booking Service?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We make it easy to find and book trusted service providers in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Verified Providers
              </h3>
              <p className="text-gray-600 text-sm">
                All providers are background-checked and verified for quality
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Transparent Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                No hidden fees. Get upfront quotes from multiple providers
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ClockIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Quick Response
              </h3>
              <p className="text-gray-600 text-sm">
                Get matched with providers and receive quotes within 2 hours
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <StarIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 text-sm">
                We guarantee the quality of all services with our satisfaction promise
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}