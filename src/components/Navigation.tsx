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
  PhoneIcon,
  BriefcaseIcon,
  ArrowRightIcon
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
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative group-hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src="/logo.png"
                  alt="Milyo Logo"
                  width={180}
                  height={48}
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ease-out group overflow-hidden ${
                  isActive(item.href)
                    ? 'text-indigo-600 bg-indigo-50/50'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <div className="relative z-10">{item.name}</div>
                {isActive(item.href) && (
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-indigo-500/0"></div>
                )}
                <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {profile?.role === 'provider' ? (
              <Link
                href="/provider/dashboard"
                className="flex items-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/provider/register"
                className="flex items-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Join as Provider
              </Link>
            )}
            
            <div className="w-px h-6 bg-slate-200 mx-2"></div>

            {isLoading ? (
              <div className="w-20 h-10 bg-slate-100 rounded-xl animate-pulse"></div>
            ) : profile ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(v => !v)}
                  className="flex items-center px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-slate-700"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    {profile.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm">{profile.name}</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 py-2 animate-fade-in-up">
                    <Link 
                      href={profile.role === 'provider' ? '/provider/dashboard' : '/dashboard'} 
                      className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
                      Profile Settings
                    </Link>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="relative px-6 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden group shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center">
                  Sign In
                  <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
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
        <div className={`md:hidden grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-2 bg-white/90 backdrop-blur-xl border-t border-slate-100/50 mt-2 rounded-2xl shadow-xl shadow-slate-200/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4 mt-2 space-y-2">
                {profile?.role === 'provider' ? (
                  <Link
                    href="/provider/dashboard"
                    className="flex items-center px-4 py-3.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/provider/register"
                    className="flex items-center px-4 py-3.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <BriefcaseIcon className="h-5 w-5 mr-3" />
                    Join as Provider
                  </Link>
                )}
                {profile ? (
                  <>
                    <Link
                      href={profile.role === 'provider' ? '/provider/dashboard' : '/dashboard'}
                      className="block px-4 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="block w-full text-left px-4 py-3.5 rounded-xl font-semibold text-rose-600 hover:bg-rose-50 transition-all mt-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;