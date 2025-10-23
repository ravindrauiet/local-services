'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserIcon, 
  PhoneIcon,
  EnvelopeIcon,
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
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const serviceTypes = [
  {
    id: 'electrician',
    name: 'Electrician',
    icon: BoltIcon,
    color: 'from-yellow-500 to-orange-500',
    description: 'Electrical repairs, installations, and maintenance',
    price: '₹500 - ₹2,000',
    popular: true
  },
  {
    id: 'plumber',
    name: 'Plumber',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    description: 'Plumbing repairs, installations, and maintenance',
    price: '₹300 - ₹1,500',
    popular: true
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    description: 'Complete wedding planning and arrangements',
    price: '₹15,000 - ₹50,000',
    popular: true
  },
  {
    id: 'tailor',
    name: 'Cloth Shop & Tailor',
    icon: ScissorsIcon,
    color: 'from-purple-500 to-indigo-500',
    description: 'Custom tailoring and alterations',
    price: '₹200 - ₹5,000',
    popular: false
  },
  {
    id: 'ro-ac',
    name: 'RO & AC Services',
    icon: CogIcon,
    color: 'from-teal-500 to-emerald-500',
    description: 'AC repair, RO maintenance, and installations',
    price: '₹800 - ₹3,000',
    popular: false
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'from-rose-500 to-pink-500',
    description: 'Hair styling, facials, and beauty treatments',
    price: '₹500 - ₹2,500',
    popular: false
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: WrenchScrewdriverIcon,
    color: 'from-amber-500 to-yellow-500',
    description: 'Furniture making, repairs, and custom work',
    price: '₹1,000 - ₹8,000',
    popular: false
  },
  {
    id: 'painter',
    name: 'Painter',
    icon: PaintBrushIcon,
    color: 'from-red-500 to-pink-500',
    description: 'Interior and exterior painting services',
    price: '₹2,000 - ₹15,000',
    popular: false
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

export default function BookService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = searchParams.get('provider');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
            Thank you for your booking request. We'll connect you with the best service providers in your area and get back to you within 2 hours.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>What happens next?</strong><br />
              • We'll match you with verified providers<br />
              • You'll receive quotes within 2 hours<br />
              • Choose your preferred provider<br />
              • Get your service completed
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
                <span className="ml-2 text-sm font-medium">Fill Details</span>
              </div>
              <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-yellow-300' : 'bg-white/20'}`}></div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-yellow-300' : 'text-white/50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-yellow-300 text-blue-600' : 'bg-white/20'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium">Confirm</span>
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
                Choose Your Service
              </h2>
              <p className="text-lg text-gray-600">
                Select the service you need and we'll connect you with the best providers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group border-2 border-transparent hover:border-blue-200"
                  >
                    <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                      {service.popular && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-900">
                        {service.price}
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
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
                    Service Details
                  </h2>
                  <p className="text-gray-600">
                    Fill in your information and service requirements
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Change Service
                </button>
              </div>

              {/* Selected Service Summary */}
              {selectedService && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${selectedService.color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
                      <selectedService.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedService.name}</h3>
                      <p className="text-sm text-gray-600">{selectedService.description}</p>
                      <p className="text-sm font-semibold text-blue-600">{selectedService.price}</p>
                    </div>
                  </div>
                </div>
              )}

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

                {/* Service Information */}
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
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We'll connect you with verified service providers in your area. 
                    You'll receive confirmation within 2 hours.
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