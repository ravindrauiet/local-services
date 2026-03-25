'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MapPinIcon,
  UserIcon,
  Cog6ToothIcon,
  SparklesIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useUserAuth } from '@/contexts/UserAuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { profile, isLoading, logout } = useUserAuth();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Close profile menu on outside click or Escape
    const onClick = (e: MouseEvent) => {
      if (!isProfileMenuOpen) return;
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProfileMenuOpen(false);
    };
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onEsc);
    };
  }, [isProfileMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Providers', href: '/providers' },
    { name: 'Book Service', href: '/book' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Milyo Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Milyo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {profile?.role === 'provider' ? (
              <Link
                href="/provider/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Provider Dashboard
              </Link>
            ) : (
              <Link
                href="/provider/register"
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Become a Provider
              </Link>
            )}
            {isLoading ? null : profile ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(v => !v)}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-800"
                >
                  <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-semibold">{profile.name}</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg">
                    <Link 
                      href={profile.role === 'provider' ? '/provider/dashboard' : '/dashboard'} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                {profile?.role === 'provider' ? (
                  <Link
                    href="/provider/dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                    Provider Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/provider/register"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                    Become a Provider
                  </Link>
                )}
                {profile ? (
                  <>
                    <Link
                      href={profile.role === 'provider' ? '/provider/dashboard' : '/dashboard'}
                      className="block mx-4 mt-3 text-gray-700 px-4 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block mx-4 mt-2 text-gray-700 px-4 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {profile.name}
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="block w-full mx-4 mt-2 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-semibold text-center hover:bg-gray-200 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block mx-4 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;