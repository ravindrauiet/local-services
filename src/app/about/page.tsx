import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About Us | Milyo - Local Services Platform',
  description: 'Learn about Milyo, our mission to connect verified local service professionals with customers across India. Trusted by 50,000+ customers.',
};

const teamMembers = [
  { name: 'Ravindra Kumar', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Passionate about connecting skilled professionals with customers who need them.' },
  { name: 'Priya Sharma', role: 'Head of Operations', emoji: '👩‍💼', bio: 'Ensuring every service delivered on our platform meets the highest quality standards.' },
  { name: 'Amit Singh', role: 'Head of Technology', emoji: '👨‍💻', bio: 'Building the technology that makes finding and booking local services effortless.' },
  { name: 'Sunita Devi', role: 'Provider Relations', emoji: '👩‍🤝‍👩', bio: 'Onboarding and supporting our network of verified service professionals.' },
];

const values = [
  { icon: ShieldCheckIcon, title: 'Trust & Safety', desc: 'Every provider on our platform is background-verified and skill-assessed before being listed.', color: 'from-green-500 to-emerald-500' },
  { icon: StarIcon, title: 'Quality First', desc: 'We maintain strict quality standards and hold providers accountable through customer reviews.', color: 'from-yellow-500 to-orange-500' },
  { icon: ClockIcon, title: 'Reliability', desc: 'On-time service every time. We track punctuality and make it a core part of our rating system.', color: 'from-blue-500 to-cyan-500' },
  { icon: HeartIcon, title: 'Community', desc: 'We empower local craftsmen and professionals to grow their businesses and reach more customers.', color: 'from-pink-500 to-rose-500' },
];

const stats = [
  { number: '50,000+', label: 'Happy Customers' },
  { number: '1,200+', label: 'Verified Professionals' },
  { number: '25+', label: 'Cities Covered' },
  { number: '4.8★', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <SparklesIcon className="h-5 w-5 mr-2 text-yellow-400" />
            <span className="text-sm font-medium text-white">Our Story</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            About
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Milyo
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to make quality local services accessible to everyone — 
            while empowering skilled professionals to build thriving businesses.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why We Built Milyo</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Finding a reliable electrician, plumber, or any local service professional used to be a frustrating 
                  experience. You relied on word-of-mouth, called random numbers, and hoped for the best — 
                  with no transparency on pricing or quality.
                </p>
                <p>
                  We built Milyo to solve exactly this problem. Our platform connects you with verified, 
                  background-checked professionals who have a track record of excellent work. Every provider 
                  on Milyo goes through a rigorous vetting process before they can accept bookings.
                </p>
                <p>
                  On the other side, we&apos;re also helping skilled craftsmen and service professionals build 
                  sustainable businesses by giving them access to a large customer base and tools to manage 
                  their work efficiently.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/services" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Browse Services
                </Link>
                <Link href="/contact" className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
                  <div className="text-4xl font-bold text-blue-700 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do at Milyo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate people building Milyo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of satisfied customers across India who trust Milyo for their service needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Book a Service
            </Link>
            <Link href="/provider/register" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
