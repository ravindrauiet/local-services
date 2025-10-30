'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface AppUserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'provider' | 'admin';
}

interface UserAuthContextType {
  user: FirebaseUser | null;
  profile: AppUserProfile | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as any;
            setProfile({
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || 'User',
              email: data.email || firebaseUser.email || '',
              phone: data.phone || '',
              role: data.role || 'user',
            });
          } else {
            // Fallback to auth data
            setProfile({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              phone: '',
              role: 'user',
            });
          }
        } catch (e) {
          console.error('Failed to load user profile:', e);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <UserAuthContext.Provider value={{ user, profile, isLoading, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error('useUserAuth must be used within UserAuthProvider');
  return ctx;
}


