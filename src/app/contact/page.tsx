'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const contactMethods = [
  { icon: PhoneIcon, title: 'Phone Support', value: '+91 98765 43210', desc: 'Mon–Sat, 9 AM – 8 PM', color: 'from-blue-500 to-cyan-500' },
  { icon: EnvelopeIcon, title: 'Email Us', value: 'support@milyo.com', desc: 'We reply within 24hrs', color: 'from-purple-500 to-indigo-500' },
  { icon: ChatBubbleLeftRightIcon, title: 'WhatsApp', value: 'Chat with us', desc: 'Instant replies', color: 'from-green-500 to-emerald-500', whatsapp: true },
  { icon: MapPinIcon, title: 'Head Office', value: 'Noida, Uttar Pradesh', desc: 'India 201301', color: 'from-orange-500 to-red-500' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_queries'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have a question, feedback, or need support? We&apos;re here to help 6 days a week.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  <div className={`w-14 h-14 bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{m.title}</h3>
                  {m.whatsapp ? (
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline block">{m.value}</a>
                  ) : (
                    <p className="text-gray-700 font-medium">{m.value}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">Fill in the form and our team will get back to you within 24 hours.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="mt-6 text-blue-600 font-medium hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input name="name" type="text" required value={form.name} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Rajesh Kumar" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="rajesh@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Issue</option>
                        <option value="provider">Provider Query</option>
                        <option value="payment">Payment Issue</option>
                        <option value="complaint">Complaint</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help you..." />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                      ⚠️ {error}
                    </div>
                  )}
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info Panel */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked</h2>
                <p className="text-gray-600 mb-6">Quick answers to common questions.</p>
                <div className="space-y-4">
                  {[
                    { q: 'How do I book a service?', a: 'Go to our Services page, choose your category, select a provider and fill the booking form. You\'ll get confirmation instantly.' },
                    { q: 'Are all providers verified?', a: 'Yes. Every provider goes through ID verification, background checks, and a skills assessment before being listed on the platform.' },
                    { q: 'What if I\'m not satisfied?', a: 'We have a satisfaction guarantee. Contact us within 48 hours of service and we\'ll arrange a re-do or refund.' },
                    { q: 'How do I become a provider?', a: 'Click "Become a Provider" and fill in the registration form. Our team reviews applications within 2-3 business days.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-2">Q: {item.q}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center mb-3">
                  <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-gray-900">Support Hours</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">9:00 AM – 8:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium">10:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-red-500">Closed</span></div>
                </div>
                <p className="text-xs text-gray-500 mt-3">* Emergency booking support available 24/7 via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
