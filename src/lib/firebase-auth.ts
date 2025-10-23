import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin';
  permissions: string[];
  lastLogin: Date;
}

// Firebase Admin Authentication
export class FirebaseAuthService {
  // Sign in admin
  static async signInAdmin(email: string, password: string): Promise<AdminUser | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get admin data from Firestore
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        return {
          id: user.uid,
          email: user.email || '',
          name: adminData.name,
          role: adminData.role,
          permissions: adminData.permissions || [],
          lastLogin: new Date()
        };
      } else {
        // If no admin document exists, sign out
        await signOut(auth);
        return null;
      }
    } catch (error) {
      console.error('Error signing in admin:', error);
      throw error;
    }
  }

  // Sign out admin
  static async signOutAdmin(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out admin:', error);
      throw error;
    }
  }

  // Get current admin user
  static async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      
      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        return {
          id: user.uid,
          email: user.email || '',
          name: adminData.name,
          role: adminData.role,
          permissions: adminData.permissions || [],
          lastLogin: new Date()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting current admin:', error);
      return null;
    }
  }

  // Listen to auth state changes
  static onAuthStateChanged(callback: (admin: AdminUser | null) => void) {
    return onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          
          if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            callback({
              id: user.uid,
              email: user.email || '',
              name: adminData.name,
              role: adminData.role,
              permissions: adminData.permissions || [],
              lastLogin: new Date()
            });
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
}
