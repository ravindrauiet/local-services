'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Premium CTA Section at Top */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative border-b border-white/5 bg-white/5 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
                  Join the <span className="text-indigo-400">Elite</span> Network
                </h3>
                <p className="text-indigo-200/80 font-medium max-w-xl">
                  Start earning by providing world-class services. Join Milyo and skyrocket your business today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Link
                  href="/provider/register"
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all text-center shadow-xl shadow-white/10"
                >
                  Become a Partner
                </Link>
                <Link
                  href="/login"
                  className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-center"
                >
                  Provider Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-8">
              <Image
                src="/logo.png"
                alt="Milyo Logo"
                width={180}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 font-medium">
              Elevating the standard of home and business services. We connect you with top-tier professionals for a premium, hassle-free experience.
            </p>
            
            {/* Trust Badges Minimal */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-400" /> Verified
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <StarIconSolid className="h-5 w-5 text-amber-400" /> 4.8★
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Providers', 'Book Service', 'About Us', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-indigo-400 transition-colors font-medium text-sm flex items-center group">
                    <span className="w-0 h-px bg-indigo-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Expertise</h4>
            <ul className="space-y-4">
              {['Electrician', 'Plumber', 'Wedding Services', 'Beauty & Wellness', 'RO & AC Services'].map((item, i) => (
                <li key={i}>
                  <Link href={`/services?type=${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="text-slate-400 hover:text-indigo-400 transition-colors font-medium text-sm flex items-center group">
                    <span className="w-0 h-px bg-indigo-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Get in Touch</h4>
            <div className="space-y-5">
              <a href="#" className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors mr-4 flex-shrink-0">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <p className="text-slate-400 text-sm mt-1 font-medium group-hover:text-slate-300 transition-colors">
                  123 Premium District<br />Noida, UP 201301
                </p>
              </a>
              <a href="tel:+919876543210" className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors mr-4 flex-shrink-0">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                  +91 98765 43210
                </p>
              </a>
              <a href="mailto:concierge@milyo.com" className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors mr-4 flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                  concierge@milyo.com
                </p>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="mt-8 flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current" style={{maskImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4"/></svg>')`, WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4"/></svg>')`}}></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm font-medium">
              © {currentYear} Milyo Premium Services. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                <Link key={i} href={`/${item.split(' ')[0].toLowerCase()}`} className="text-slate-500 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
