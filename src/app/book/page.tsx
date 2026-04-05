'use client';

import { useState, useEffect, Suspense } from 'react';
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
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUserAuth } from '@/contexts/UserAuthContext';

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

function BookServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserAuth();
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
  const [selectedProvider, setSelectedProvider] = useState<{id: string, name: string, rating: number, price: string, serviceType?: string, photo?: string} | null>(null);
  const [loadingProvider, setLoadingProvider] = useState(false);
  const [availableProviders, setAvailableProviders] = useState<Array<{
    id: string;
    name: string;
    businessName?: string;
    serviceType: string;
    rating: number;
    address: string;
    phone: string;
    email: string;
    description?: string;
    price?: string;
    reviews?: number;
    experience?: string;
    specialties?: string[];
    photo?: string;
    responseTime?: string;
    completedJobs?: number;
  }>>([]);
  const [loadingProviders, setLoadingProviders] = useState(false);
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
      // Load provider from Firestore
      const loadProvider = async () => {
        setLoadingProvider(true);
        try {
          const ref = doc(db, 'providers', providerId);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            const provider = {
              id: snap.id,
              name: data.name || 'Unknown Provider',
              rating: data.rating || 0,
              price: data.price || 'Contact for pricing',
              serviceType: data.serviceType || ''
            };
            setSelectedProvider(provider);
            
            // Auto-select service based on provider's service type
            if (data.serviceType) {
              const serviceTypeMap: Record<string, string> = {
                'Electrician': 'electrician',
                'Plumber': 'plumber',
                'Wedding Services': 'wedding-services',
                'Cloth Shop & Tailor': 'tailor',
                'RO & AC Services': 'ro-ac',
                'Beauty & Wellness': 'beauty'
              };
              
              const categoryKey = serviceTypeMap[data.serviceType];
              if (categoryKey && serviceCategories[categoryKey as keyof typeof serviceCategories]) {
                const category = serviceCategories[categoryKey as keyof typeof serviceCategories];
                // Select first service from the category as default, or create a generic one
                const firstServiceKey = Object.keys(category.services)[0];
                if (firstServiceKey) {
                  const serviceInfo = category.services[firstServiceKey as keyof typeof category.services] as { price: string; time: string; description: string };
                  setSelectedService({
                    id: categoryKey,
                    name: firstServiceKey,
                    price: serviceInfo?.price || 'Contact for pricing',
                    time: serviceInfo?.time || 'Contact for timing',
                    description: serviceInfo?.description || `${firstServiceKey} service`
                  });
                  setFormData(prev => ({
                    ...prev,
                    serviceType: firstServiceKey
                  }));
                } else {
                  // Generic service if none found
                  setSelectedService({
                    id: categoryKey,
                    name: data.serviceType,
                    price: 'Contact for pricing',
                    time: 'Contact for timing',
                    description: `${data.serviceType} service`
                  });
                  setFormData(prev => ({
                    ...prev,
                    serviceType: data.serviceType
                  }));
                }
              } else {
                // Generic service if category not found
                setSelectedService({
                  id: 'general',
                  name: data.serviceType || 'Service',
                  price: 'Contact for pricing',
                  time: 'Contact for timing',
                  description: `${data.serviceType || 'Service'} service`
                });
                setFormData(prev => ({
                  ...prev,
                  serviceType: data.serviceType || 'Service'
                }));
              }
            }
            
            // If provider is pre-selected, go to step 3 (booking form)
            setCurrentStep(3);
          } else {
            // Provider not found, try fallback to mock data
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
              setCurrentStep(3);
            }
          }
        } catch (e) {
          console.error('Failed to load provider', e);
          // Fallback to mock data
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
            setCurrentStep(3);
          }
        } finally {
          setLoadingProvider(false);
        }
      };
      loadProvider();
    }
  }, [categoryId, serviceName, providerId]);

  // Load providers from Firestore when service is selected
  useEffect(() => {
    const loadProvidersForCategory = async () => {
      if (!categoryId || currentStep !== 2) return;
      
      // Map category ID to service type
      const categoryToServiceType: Record<string, string> = {
        'electrician': 'Electrician',
        'plumber': 'Plumber',
        'wedding-services': 'Wedding Services',
        'tailor': 'Cloth Shop & Tailor',
        'ro-ac': 'RO & AC Services',
        'beauty': 'Beauty & Wellness'
      };
      
      const serviceType = categoryToServiceType[categoryId];
      if (!serviceType) return;
      
      setLoadingProviders(true);
      try {
        const q = query(
          collection(db, 'providers'),
          where('isApproved', '==', true),
          where('isActive', '==', true),
          where('serviceType', '==', serviceType)
        );
        const snap = await getDocs(q);
        const providers: Array<{
          id: string;
          name: string;
          businessName?: string;
          serviceType: string;
          rating: number;
          address: string;
          phone: string;
          email: string;
          reviews?: number;
          experience?: string;
          specialties?: string[];
          photo?: string;
          price?: string;
          responseTime?: string;
          completedJobs?: number;
        }> = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          providers.push({
            id: docSnap.id,
            name: data.name || 'Unknown',
            businessName: data.businessName || '',
            serviceType: data.serviceType || serviceType,
            rating: data.rating || 0,
            address: data.address || '',
            phone: data.phone || '',
            email: data.email || '',
            reviews: data.totalReviews || 0,
            experience: data.experience || '',
            specialties: data.specialties || [],
            photo: data.photo || '',
            price: data.price || 'Contact for pricing',
            responseTime: data.responseTime || '',
            completedJobs: data.completedJobs || 0
          });
        });
        
        // Sort by rating (highest first)
        providers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setAvailableProviders(providers);
      } catch (e) {
        console.error('Failed to load providers', e);
        setAvailableProviders([]);
      } finally {
        setLoadingProviders(false);
      }
    };
    
    loadProvidersForCategory();
  }, [categoryId, currentStep]);

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
      // Validate required fields
      if (!formData.customerName || !formData.customerPhone || !formData.serviceDate || !formData.serviceTime || !formData.location || !formData.address) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Get current user ID (or use null if not logged in)
      const userId = user?.uid || null;

      // Prepare booking data
      const bookingData = {
        userId: userId || 'guest', // Use 'guest' if user not logged in
        providerId: selectedProvider?.id || '', // Optional - will be assigned by admin
        serviceType: formData.serviceType || selectedService?.name || 'Service',
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || null,
        serviceDate: formData.serviceDate,
        serviceTime: formData.serviceTime,
        location: formData.location,
        address: formData.address,
        additionalNotes: formData.additionalNotes || null,
        status: 'pending', // Initial status - admin will assign provider
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Save booking to Firestore
      const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
      
      console.log('Booking saved successfully with ID:', bookingRef.id);
      
      setIsSubmitted(true);
      
      // Redirect to dashboard or success page
      setTimeout(() => {
        if (userId) {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking. Please try again.');
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

  if (loadingProvider && providerId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading provider information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Elevated Wizard Header */}
      <section className="relative bg-slate-950 overflow-hidden pt-10 pb-8">
        {/* Animated Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-600/30 blur-[100px] animate-pulse"></div>
          <div className="absolute top-[30%] right-[-10%] w-[30%] h-[50%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel-dark border border-white/10 mb-6 shadow-xl">
            <SparklesIcon className="h-4 w-4 mr-2 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-100 uppercase tracking-widest">Premium Booking Experience</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-glow">Expert</span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-medium mb-12">
            Seamlessly connect with vetted professionals. Transparent pricing, guaranteed quality, effortless scheduling.
          </p>
          
          {/* Glassmorphic Progress Steps */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel-dark rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-50"></div>
              <div className="relative flex justify-between items-center z-10 w-full px-2 sm:px-8">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center group relative w-1/3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 transition-all duration-500 shadow-lg ${
                    currentStep >= 1 ? 'bg-indigo-500 border-indigo-400 text-white shadow-indigo-500/50' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {currentStep > 1 ? <CheckCircleIcon className="w-6 h-6" /> : '1'}
                  </div>
                  <span className={`mt-3 text-xs sm:text-sm font-bold tracking-wide transition-colors duration-500 ${currentStep >= 1 ? 'text-indigo-200' : 'text-slate-500'}`}>Service</span>
                </div>
                
                {/* Connector 1 */}
                <div className="flex-1 -mx-4 sm:-mx-8 z-0">
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-full relative group shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center group relative w-1/3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 transition-all duration-500 shadow-lg ${
                    currentStep >= 2 ? 'bg-blue-500 border-blue-400 text-white shadow-blue-500/50' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {currentStep > 2 ? <CheckCircleIcon className="w-6 h-6" /> : '2'}
                  </div>
                  <span className={`mt-3 text-xs sm:text-sm font-bold tracking-wide transition-colors duration-500 ${currentStep >= 2 ? 'text-blue-200' : 'text-slate-500'}`}>Provider</span>
                </div>

                {/* Connector 2 */}
                <div className="flex-1 -mx-4 sm:-mx-8 z-0">
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-full relative group shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center group relative w-1/3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base border-2 transition-all duration-500 shadow-lg ${
                    currentStep >= 3 ? 'bg-teal-400 border-teal-300 text-slate-900 shadow-teal-400/50' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    3
                  </div>
                  <span className={`mt-3 text-xs sm:text-sm font-bold tracking-wide transition-colors duration-500 ${currentStep >= 3 ? 'text-teal-200' : 'text-slate-500'}`}>Confirm</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Step 1: Service Selection (only if no service pre-selected) */}
        {currentStep === 1 && !selectedService && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                What do you need help with?
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Select a category to view top-rated professionals in your area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(serviceCategories).map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.id}
                    onClick={() => {
                      // Get first service from category
                      const firstServiceKey = Object.keys(category.services)[0];
                      if (firstServiceKey) {
                      const serviceInfo = category.services[firstServiceKey as keyof typeof category.services] as { price: string; time: string; description: string };
                      setSelectedService({
                        id: category.id,
                        name: firstServiceKey,
                        price: serviceInfo?.price || 'Contact for pricing',
                        time: serviceInfo?.time || 'Contact for timing',
                        description: serviceInfo?.description || `${firstServiceKey} service`
                      });
                        setFormData(prev => ({
                          ...prev,
                          serviceType: firstServiceKey
                        }));
                        // Update URL with category
                        router.push(`/book?category=${category.id}&service=${encodeURIComponent(firstServiceKey)}`);
                      }
                      setCurrentStep(2);
                    }}
                    className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 p-6 cursor-pointer group border border-slate-100 hover:border-indigo-100 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125"></div>
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${category.color} shadow-lg shadow-${category.color.split('-')[1]}-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 text-white`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{category.name}</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm font-bold text-indigo-500 flex items-center">
                        Select Category
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-500 transition-colors duration-300">
                        <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Provider Selection */}
        {currentStep === 2 && selectedService && (
          <div className="max-w-5xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                    Select your Expert
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Choose from our elite, verified {serviceCategories[categoryId as keyof typeof serviceCategories]?.name.toLowerCase() || 'service'} professionals
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-slate-500 hover:text-indigo-600 font-semibold flex items-center bg-slate-50 px-4 py-2 rounded-xl transition-all hover:bg-indigo-50"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Go Back
                </button>
              </div>

              {/* Selected Service Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-10 border border-indigo-100/50 shadow-inner">
                <div className="flex items-center">
                  <div className={`bg-gradient-to-br ${serviceCategories[categoryId as keyof typeof serviceCategories]?.color || 'from-indigo-500 to-purple-500'} w-14 h-14 rounded-2xl flex items-center justify-center mr-5 shadow-lg`}>
                    <div className="h-7 w-7 text-white">
                      <SparklesIcon />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight mb-1">{selectedService.name}</h3>
                    <p className="text-sm text-slate-600 font-medium mb-1">{selectedService.description}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">{selectedService.price}</span>
                      <span className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center"><ClockIcon className="w-3 h-3 mr-1" />{selectedService.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Providers List */}
              {loadingProviders ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="relative w-16 h-16 animate-spin mb-6">
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 border-opacity-50"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 border-opacity-75 animate-spin blur-sm"></div>
                  </div>
                  <p className="text-slate-500 font-semibold tracking-wide animate-pulse">Finding the perfect experts for you...</p>
                </div>
              ) : availableProviders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {availableProviders.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={() => handleProviderSelect({
                        id: provider.id,
                        name: provider.name,
                        rating: provider.rating,
                        price: provider.price || 'Contact for pricing'
                      })}
                      className="bg-white border hover:border-transparent border-slate-100 rounded-3xl p-6 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-3xl m-[-2px]"></div>
                      <div className="absolute inset-[2px] bg-white rounded-[22px] z-0"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center mb-5">
                          {provider.photo ? (
                            <img
                              src={provider.photo}
                              alt={provider.name}
                              className="w-14 h-14 rounded-full object-cover mr-4 shadow-md ring-2 ring-indigo-50"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-md ${provider.photo ? 'hidden' : ''}`}>
                            {provider.photo ? null : (
                              <span className="text-white font-black text-xl">
                                {provider.name?.charAt(0) || '?'}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{provider.name}</h3>
                            <p className="text-xs font-semibold text-slate-500 flex items-center">
                              <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                              {provider.businessName}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                              <StarIconSolid className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-bold text-slate-900">{provider.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">({provider.reviews || 0} reviews)</span>
                          </div>
                        </div>
                        
                        {provider.specialties && provider.specialties.length > 0 && (
                          <div className="mb-5">
                            <div className="flex flex-wrap gap-2">
                              {provider.specialties.slice(0, 3).map((specialty: string, index: number) => (
                                <span key={index} className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-semibold group-hover:bg-white transition-colors">
                                  {specialty}
                                </span>
                              ))}
                              {provider.specialties.length > 3 && (
                                <span className="bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-xs font-semibold">
                                  +{provider.specialties.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-end justify-between pt-4 border-t border-slate-50 group-hover:border-indigo-50 transition-colors">
                          <div className="flex space-x-6">
                            {provider.experience && (
                              <div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Experience</div>
                                <div className="text-sm font-bold text-slate-900">{provider.experience}</div>
                              </div>
                            )}
                            {provider.responseTime && (
                              <div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Response</div>
                                <div className="text-sm font-bold text-slate-900">{provider.responseTime}</div>
                              </div>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                            <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="text-center py-12">
                  <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Providers Available</h3>
                  <p className="text-gray-600 mb-6">
                    There are no verified providers available for this service at the moment.
                  </p>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Choose a Different Service
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Booking Form */}
        {currentStep === 3 && selectedService && selectedProvider && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 sm:p-10 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full -z-10"></div>
              
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                    Finalize your request
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Provide your details to confirm your elite booking.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-slate-500 hover:text-teal-600 font-semibold flex items-center bg-slate-50 px-4 py-2 rounded-xl transition-all hover:bg-teal-50"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Edit Selection
                </button>
              </div>

              {/* Service & Provider Summary */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/20 blur-[50px] rounded-full"></div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10">
                  <div className="flex items-center mb-6 sm:mb-0">
                    <div className="relative">
                      {selectedProvider.photo ? (
                        <img src={selectedProvider.photo || ''} alt="Provider" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/10" />
                      ) : (
                        <div className={`bg-gradient-to-br ${serviceCategories[categoryId as keyof typeof serviceCategories]?.color || 'from-teal-400 to-emerald-500'} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white/10`}>
                          <SparklesIcon className="h-8 w-8 text-white" />
                        </div>
                      )}
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg border-2 border-slate-900">
                        <CheckCircleIcon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="ml-5">
                      <div className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-1">{selectedService.name}</div>
                      <h3 className="font-bold text-white text-xl mb-1">{selectedProvider.name}</h3>
                      <div className="flex items-center">
                        <StarIconSolid className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-sm font-semibold text-slate-200">{selectedProvider.rating}</span>
                        <span className="text-sm text-slate-400 ml-1.5 font-medium">(Verified Expert)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Estimated Cost</div>
                    <div className="font-black text-2xl text-white tracking-tight">{selectedService.price}</div>
                    <div className="text-sm text-teal-400 font-medium mt-1 flex items-center sm:justify-end">
                      <ClockIcon className="w-4 h-4 mr-1" /> {selectedService.time}
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center mb-6 uppercase tracking-wider">
                    <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl mr-3"><UserIcon className="h-5 w-5" /></span>
                    1. Contact Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="customerName" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-600 transition-colors">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="customerPhone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-600 transition-colors">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        required
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div className="md:col-span-2 group">
                      <label htmlFor="customerEmail" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-600 transition-colors">
                        Email Address <span className="text-slate-400 font-medium normal-case tracking-normal">(Optional, for receipts)</span>
                      </label>
                      <input
                        type="email"
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Service Schedule */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center mb-6 uppercase tracking-wider">
                    <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl mr-3"><CalendarIcon className="h-5 w-5" /></span>
                    2. Service Schedule
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="serviceDate" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">
                        Select Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="serviceDate"
                        name="serviceDate"
                        required
                        min={today}
                        value={formData.serviceDate}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="serviceTime" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">
                        Select Time <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="serviceTime"
                        name="serviceTime"
                        required
                        value={formData.serviceTime}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                      >
                        <option value="">Preferred time slot</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Location Information */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center mb-6 uppercase tracking-wider">
                    <span className="bg-rose-100 text-rose-600 p-2 rounded-xl mr-3"><MapPinIcon className="h-5 w-5" /></span>
                    3. Location Address
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-rose-600 transition-colors">
                        City / Area <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm"
                        placeholder="e.g. South Delhi, Andheri West"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="address" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-rose-600 transition-colors">
                        Complete Address <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm resize-none"
                        placeholder="House/Flat number, Building name, Street, Landmark"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="additionalNotes" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-rose-600 transition-colors">
                        Specific Instructions <span className="text-slate-400 font-medium normal-case tracking-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        rows={2}
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-slate-900 font-medium transition-all shadow-sm resize-none"
                        placeholder="Any context the professional should know before arrival..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 px-6 rounded-2xl font-black focus:outline-none focus:ring-4 focus:ring-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-slate-900/10 text-xl tracking-wide flex items-center justify-center group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-sm text-slate-500 font-medium mt-4 flex items-center justify-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-1 text-emerald-500" /> Secure booking. No upfront payment required.
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

export default function BookService() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookServiceContent />
    </Suspense>
  );
}