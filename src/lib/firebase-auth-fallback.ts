import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin';
  permissions: string[];
  lastLogin: Date;
}

// Fallback Authentication Service (Firestore-based)
// This works without Firebase Auth enabled
export class FirebaseAuthFallbackService {
  // Sign in admin using Firestore
  static async signInAdmin(email: string, password: string): Promise<AdminUser | null> {
    try {
      // Check if admin exists in Firestore
      const adminDoc = await getDoc(doc(db, 'admins', email));
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        
        // Simple password check (in production, use proper hashing)
        if (adminData.password === password) {
          const adminUser: AdminUser = {
            id: adminData.id || email,
            email: adminData.email,
            name: adminData.name,
            role: adminData.role,
            permissions: adminData.permissions || [],
            lastLogin: new Date()
          };

          // Update last login
          await setDoc(doc(db, 'admins', email), {
            ...adminData,
            lastLogin: serverTimestamp()
          }, { merge: true });

          return adminUser;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error signing in admin:', error);
      throw error;
    }
  }

  // Sign out admin (just clear local state)
  static async signOutAdmin(): Promise<void> {
    // In fallback mode, we just clear local state
    // No Firebase Auth to sign out from
    return Promise.resolve();
  }

  // Get current admin user (from localStorage)
  static async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      if (typeof window !== 'undefined') {
        const storedAdmin = localStorage.getItem('admin_user');
        if (storedAdmin) {
          return JSON.parse(storedAdmin);
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting current admin:', error);
      return null;
    }
  }

  // Listen to auth state changes (simplified for fallback)
  static onAuthStateChanged(callback: (admin: AdminUser | null) => void) {
    // In fallback mode, we check localStorage
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const storedAdmin = localStorage.getItem('admin_user');
        if (storedAdmin) {
          try {
            const admin = JSON.parse(storedAdmin);
            callback(admin);
          } catch (error) {
            callback(null);
          }
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    };

    // Check immediately
    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === 'admin_user') {
          checkAuth();
        }
      });
    }

    // Return unsubscribe function
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', checkAuth);
      }
    };
  }

  // Initialize default admin if not exists
  static async initializeDefaultAdmin(): Promise<void> {
    try {
      const defaultAdmin = {
        id: 'admin1',
        email: 'admin@localservices.com',
        password: 'admin123', // In production, hash this
        name: 'System Administrator',
        role: 'super-admin',
        permissions: ['*'], // All permissions
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      };

      const adminDoc = await getDoc(doc(db, 'admins', defaultAdmin.email));
      
      if (!adminDoc.exists()) {
        await setDoc(doc(db, 'admins', defaultAdmin.email), defaultAdmin);
        console.log('Default admin created successfully');
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
      throw error;
    }
  }
}
