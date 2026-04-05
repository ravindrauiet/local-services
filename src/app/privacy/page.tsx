import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Milyo',
  description: 'Read the Milyo Privacy Policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  const lastUpdated = 'March 26, 2025';

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-blue-200">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, phone number, and location when you register or book a service. We also collect usage data such as pages visited, search terms, and booking history to improve our platform.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>We use your information to provide and improve our services, connect you with service providers, send booking confirmations and reminders, resolve disputes, and ensure platform safety.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Information Sharing</h2>
              <p>We share your contact details with service providers only after a confirmed booking. We do not sell your personal data to third parties. We may share aggregated, anonymized data for analytics purposes.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Data Security</h2>
              <p>We use Firebase (Google Cloud) infrastructure with industry-standard encryption to protect your data. All communications are encrypted via HTTPS/TLS.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:privacy@milyo.com" className="text-blue-600 hover:underline">privacy@milyo.com</a>.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cookies</h2>
              <p>We use essential cookies to keep you signed in and remember your preferences. We do not use advertising cookies or third-party tracking.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
              <p>For privacy-related questions, email <a href="mailto:privacy@milyo.com" className="text-blue-600 hover:underline">privacy@milyo.com</a> or visit our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
