'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseAuthFallbackService, AdminUser } from '@/lib/firebase-auth-fallback';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize default admin and listen to auth state changes
    const initializeAuth = async () => {
      try {
        // Initialize default admin if not exists
        await FirebaseAuthFallbackService.initializeDefaultAdmin();
        
        // Listen to auth state changes
        const unsubscribe = FirebaseAuthFallbackService.onAuthStateChanged((adminUser) => {
          setAdmin(adminUser);
          setIsLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoading(false);
        return () => {};
      }
    };

    const unsubscribe = initializeAuth();
    return () => {
      unsubscribe.then(unsub => unsub());
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const adminUser = await FirebaseAuthFallbackService.signInAdmin(email, password);
      if (adminUser) {
        setAdmin(adminUser);
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_user', JSON.stringify(adminUser));
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

  const logout = async () => {
    try {
      await FirebaseAuthFallbackService.signOutAdmin();
      setAdmin(null);
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_user');
      }
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false;
    if (admin.permissions.includes('*')) return true; // Super admin
    return admin.permissions.includes(permission);
  };

  const value = {
    admin,
    isLoading,
    login,
    logout,
    hasPermission
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
