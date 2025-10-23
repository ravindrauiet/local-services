import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Types for Firebase documents
export interface FirebaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'provider' | 'admin';
  isActive: boolean;
  createdAt: Timestamp;
  lastLogin?: Timestamp;
  profile?: {
    address?: string;
    preferences?: string[];
    businessName?: string;
    serviceType?: string;
  };
}

export interface FirebaseProvider {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  experience?: string;
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  totalBookings: number;
  photo?: string;
  logo?: string;
}

export interface FirebaseBooking {
  id: string;
  userId: string;
  providerId: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceDate: string;
  serviceTime: string;
  location: string;
  address: string;
  additionalNotes?: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  providerName?: string;
}

export interface FirebaseNotification {
  id: string;
  title: string;
  message: string;
  type: 'provider_registration' | 'booking_completed' | 'payment_received' | 'system_alert' | 'user_registration';
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: Timestamp;
  actionUrl?: string;
  metadata?: any;
}

// Admin Statistics
export interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalBookings: number;
  pendingBookings: number;
  approvedProviders: number;
  pendingProviders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  averageRating: number;
  responseTime: string;
}

// Firebase Admin Functions
export class FirebaseAdminService {
  // Get all users
  static async getUsers(filters?: {
    role?: string;
    status?: 'active' | 'inactive' | 'all';
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    try {
      const usersRef = collection(db, 'users');
      let q = query(usersRef);

      // Apply filters
      if (filters?.role && filters.role !== 'all') {
        q = query(q, where('role', '==', filters.role));
      }
      
      if (filters?.status === 'active') {
        q = query(q, where('isActive', '==', true));
      } else if (filters?.status === 'inactive') {
        q = query(q, where('isActive', '==', false));
      }

      // Apply sorting
      if (filters?.sortBy) {
        q = query(q, orderBy(filters.sortBy, filters?.sortOrder || 'desc'));
      }

      const snapshot = await getDocs(q);
      const users: FirebaseUser[] = [];
      
      snapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        } as FirebaseUser);
      });

      // Apply search filter (client-side for text search)
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        return users.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.phone.includes(searchTerm)
        );
      }

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get all providers
  static async getProviders(filters?: {
    status?: 'pending' | 'approved' | 'active' | 'inactive' | 'all';
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    try {
      const providersRef = collection(db, 'providers');
      let q = query(providersRef);

      // Apply filters
      if (filters?.status === 'pending') {
        q = query(q, where('isApproved', '==', false));
      } else if (filters?.status === 'approved') {
        q = query(q, where('isApproved', '==', true));
      } else if (filters?.status === 'active') {
        q = query(q, where('isActive', '==', true));
      } else if (filters?.status === 'inactive') {
        q = query(q, where('isActive', '==', false));
      }

      // Apply sorting
      if (filters?.sortBy) {
        q = query(q, orderBy(filters.sortBy, filters?.sortOrder || 'desc'));
      }

      const snapshot = await getDocs(q);
      const providers: FirebaseProvider[] = [];
      
      snapshot.forEach((doc) => {
        providers.push({
          id: doc.id,
          ...doc.data()
        } as FirebaseProvider);
      });

      // Apply search filter (client-side for text search)
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        return providers.filter(provider => 
          provider.name.toLowerCase().includes(searchTerm) ||
          provider.businessName?.toLowerCase().includes(searchTerm) ||
          provider.serviceType.toLowerCase().includes(searchTerm)
        );
      }

      return providers;
    } catch (error) {
      console.error('Error fetching providers:', error);
      throw error;
    }
  }

  // Get all bookings
  static async getBookings(filters?: {
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    try {
      const bookingsRef = collection(db, 'bookings');
      let q = query(bookingsRef);

      // Apply filters
      if (filters?.status && filters.status !== 'all') {
        q = query(q, where('status', '==', filters.status));
      }

      // Apply sorting
      if (filters?.sortBy) {
        q = query(q, orderBy(filters.sortBy, filters?.sortOrder || 'desc'));
      }

      const snapshot = await getDocs(q);
      const bookings: FirebaseBooking[] = [];
      
      snapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        } as FirebaseBooking);
      });

      // Apply search filter (client-side for text search)
      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        return bookings.filter(booking => 
          booking.customerName.toLowerCase().includes(searchTerm) ||
          booking.serviceType.toLowerCase().includes(searchTerm) ||
          booking.providerName?.toLowerCase().includes(searchTerm)
        );
      }

      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  // Get admin statistics
  static async getAdminStats(): Promise<AdminStats> {
    try {
      const [users, providers, bookings] = await Promise.all([
        this.getUsers(),
        this.getProviders(),
        this.getBookings()
      ]);

      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const activeBookings = bookings.filter(b => b.status === 'accepted' || b.status === 'in-progress').length;
      const completedBookings = bookings.filter(b => b.status === 'completed').length;
      const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
      const approvedProviders = providers.filter(p => p.isApproved).length;
      const pendingProviders = providers.filter(p => !p.isApproved).length;

      const totalRevenue = bookings
        .filter(b => b.status === 'completed' && b.totalAmount)
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      // Calculate monthly revenue (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const monthlyRevenue = bookings
        .filter(b => 
          b.status === 'completed' && 
          b.totalAmount &&
          b.createdAt.toDate() >= thirtyDaysAgo
        )
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      const averageRating = providers.length > 0 
        ? providers.reduce((sum, p) => sum + p.rating, 0) / providers.length 
        : 0;

      return {
        totalUsers: users.length,
        totalProviders: providers.length,
        totalBookings: bookings.length,
        pendingBookings,
        approvedProviders,
        pendingProviders,
        totalRevenue,
        monthlyRevenue,
        activeBookings,
        completedBookings,
        cancelledBookings,
        averageRating: Math.round(averageRating * 10) / 10,
        responseTime: '2.3 hours' // This would be calculated from actual data
      };
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  }

  // Get notifications
  static async getNotifications(filters?: {
    type?: string;
    isRead?: boolean;
    priority?: string;
    limit?: number;
  }) {
    try {
      const notificationsRef = collection(db, 'notifications');
      let q = query(notificationsRef);

      // Apply filters
      if (filters?.type && filters.type !== 'all') {
        q = query(q, where('type', '==', filters.type));
      }
      
      if (filters?.isRead !== undefined) {
        q = query(q, where('isRead', '==', filters.isRead));
      }
      
      if (filters?.priority && filters.priority !== 'all') {
        q = query(q, where('priority', '==', filters.priority));
      }

      // Apply sorting and limit
      q = query(q, orderBy('createdAt', 'desc'));
      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const snapshot = await getDocs(q);
      const notifications: FirebaseNotification[] = [];
      
      snapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data()
        } as FirebaseNotification);
      });

      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  // Update provider status
  static async updateProviderStatus(providerId: string, updates: {
    isApproved?: boolean;
    isActive?: boolean;
  }) {
    try {
      const providerRef = doc(db, 'providers', providerId);
      await updateDoc(providerRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating provider status:', error);
      throw error;
    }
  }

  // Update booking status
  static async updateBookingStatus(bookingId: string, status: string) {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Update user status
  static async updateUserStatus(userId: string, updates: {
    isActive?: boolean;
    role?: string;
  }) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Delete provider
  static async deleteProvider(providerId: string) {
    try {
      const providerRef = doc(db, 'providers', providerId);
      await deleteDoc(providerRef);
      return true;
    } catch (error) {
      console.error('Error deleting provider:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(userId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Delete booking
  static async deleteBooking(bookingId: string) {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await deleteDoc(bookingRef);
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }
}
