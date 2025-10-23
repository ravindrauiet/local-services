'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  PhotoIcon,
  CheckCircleIcon,
  SparklesIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ScissorsIcon,
  CogIcon,
  HeartIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowRightIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const serviceTypes = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    description: 'Electrical repairs, installations, and maintenance',
    demand: 'High',
    avgEarnings: '₹15,000-30,000/month'
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    description: 'Plumbing repairs, installations, and maintenance',
    demand: 'High',
    avgEarnings: '₹12,000-25,000/month'
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    description: 'Complete wedding planning and arrangements',
    demand: 'Medium',
    avgEarnings: '₹25,000-50,000/month'
  },
  {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    description: 'Custom tailoring and alterations',
    demand: 'Medium',
    avgEarnings: '₹10,000-20,000/month'
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    description: 'AC repair, RO maintenance, and installations',
    demand: 'High',
    avgEarnings: '₹18,000-35,000/month'
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    description: 'Hair styling, facials, and beauty treatments',
    demand: 'High',
    avgEarnings: '₹15,000-30,000/month'
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: WrenchScrewdriverIcon,
    color: 'from-amber-500 to-yellow-500',
    description: 'Furniture making, repairs, and custom work',
    demand: 'Medium',
    avgEarnings: '₹12,000-25,000/month'
  },
  {
    id: 'painter',
    name: 'Painter',
    icon: PaintBrushIcon,
    color: 'from-red-500 to-pink-500',
    description: 'Interior and exterior painting services',
    demand: 'Medium',
    avgEarnings: '₹15,000-30,000/month'
  }
];

export default function ProviderRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    serviceType: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    experience: '',
    photo: null as File | null,
    logo: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'logo') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      serviceType: service.name
    }));
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically upload files to Firebase Storage
      // and save the provider data to Firestore
      // For now, we'll just simulate the submission
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      // Redirect to success page or show success message
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for registering as a service provider. We'll review your application and get back to you within 24-48 hours.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>What happens next?</strong><br />
              • We'll review your application<br />
              • Background verification process<br />
              • Account activation within 48 hours<br />
              • Start receiving bookings
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You'll be redirected to the home page shortly...
          </p>
        </div>
      </div>
    );
  }

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
              Become a <span className="text-yellow-300">Service Provider</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our platform and start earning by providing quality services to customers in your area. 
              Build your business with us!
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-yellow-300 text-green-600' : 'bg-white/20'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Choose Service</span>
              </div>
              <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-yellow-300' : 'bg-white/20'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-yellow-300 text-green-600' : 'bg-white/20'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Fill Details</span>
              </div>
              <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-yellow-300' : 'bg-white/20'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-yellow-300 text-green-600' : 'bg-white/20'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Submit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Service Category
              </h2>
              <p className="text-lg text-gray-600">
                Select the service you want to provide and start earning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group border-2 border-transparent hover:border-green-200"
                  >
                    <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.demand === 'High' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.demand} Demand
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-green-600">
                        {service.avgEarnings}
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Provider Information
                  </h2>
                  <p className="text-gray-600">
                    Fill in your details to complete registration
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Change Service
                </button>
              </div>

              {/* Selected Service Summary */}
              {selectedService && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${selectedService.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                      <selectedService.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedService.name}</h3>
                      <p className="text-sm text-gray-600">{selectedService.description}</p>
                      <p className="text-sm font-semibold text-green-600">{selectedService.avgEarnings}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <UserIcon className="h-6 w-6 mr-3 text-green-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        placeholder="Enter your business name"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <BuildingOfficeIcon className="h-6 w-6 mr-3 text-green-600" />
                    Service Information
                  </h3>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      placeholder="Describe the services you provide"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience (Optional)
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      placeholder="e.g., 5 years of experience"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <PhoneIcon className="h-6 w-6 mr-3 text-green-600" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-3 text-green-600" />
                    Location Information
                  </h3>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <PhotoIcon className="h-6 w-6 mr-3 text-green-600" />
                    Photos (Optional)
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Logo
                      </label>
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    By submitting this form, you agree to our terms of service and privacy policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join as a <span className="text-green-600">Service Provider?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful service providers who are growing their business with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Earn More
              </h3>
              <p className="text-gray-600 text-sm">
                Increase your earnings with our platform's customer base and transparent pricing
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                More Customers
              </h3>
              <p className="text-gray-600 text-sm">
                Get connected with customers actively looking for your services
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Verified Platform
              </h3>
              <p className="text-gray-600 text-sm">
                Build trust with customers through our verification and rating system
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ChartBarIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Grow Your Business
              </h3>
              <p className="text-gray-600 text-sm">
                Access analytics and tools to grow and manage your service business
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Service Business?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our platform today and start earning by providing quality services to customers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Start Registration
            </button>
            <a
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Browse Services
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}