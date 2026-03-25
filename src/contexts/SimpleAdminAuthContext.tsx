'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin';
  permissions: string[];
}

interface SimpleAdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const SimpleAdminAuthContext = createContext<SimpleAdminAuthContextType | undefined>(undefined);

export function SimpleAdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage (persisted session)
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('simple_admin_user') : null;
      if (stored) {
        setAdmin(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (email === 'admin@milyo.com' && password === 'admin123') {
        const adminData = {
          id: '1',
          email: 'admin@milyo.com',
          name: 'System Administrator',
          role: 'super-admin' as const,
          permissions: ['*']
        };
        setAdmin(adminData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('simple_admin_user', JSON.stringify(adminData));
        }
        return true;
      }
      
      // Check moderator credentials
      if (email === 'moderator@milyo.com' && password === 'mod123') {
        const adminData = {
          id: '2',
          email: 'moderator@milyo.com',
          name: 'Moderator',
          role: 'admin' as const,
          permissions: ['read', 'update']
        };
        setAdmin(adminData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('simple_admin_user', JSON.stringify(adminData));
        }
        return true;
      }

      // Custom admin (requested)
      if (email === 'ravindra@gmail.com' && password === '123456') {
        const adminData = {
          id: '3',
          email: 'ravindra@gmail.com',
          name: 'Ravindra',
          role: 'admin' as const,
          permissions: ['read', 'update', 'approve']
        };
        setAdmin(adminData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('simple_admin_user', JSON.stringify(adminData));
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('simple_admin_user');
    }
  };

  const value = {
    admin,
    isLoading,
    login,
    logout
  };

  return (
    <SimpleAdminAuthContext.Provider value={value}>
      {children}
    </SimpleAdminAuthContext.Provider>
  );
}

export function useSimpleAdminAuth() {
  const context = useContext(SimpleAdminAuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAdminAuth must be used within a SimpleAdminAuthProvider');
  }
  return context;
}
