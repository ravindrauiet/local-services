import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Firebase Setup Script
// Run this script to initialize your Firestore collections with sample data

export class FirebaseSetupService {
  // Initialize admin users
  static async initializeAdmins() {
    try {
      const admins = [
        {
          id: 'admin1',
          email: 'admin@localservices.com',
          password: 'admin123', // In production, hash this
          name: 'System Administrator',
          role: 'super-admin',
          permissions: ['*'], // All permissions
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        },
        {
          id: 'admin2',
          email: 'moderator@localservices.com',
          password: 'mod123', // In production, hash this
          name: 'Content Moderator',
          role: 'admin',
          permissions: [
            'manage_providers',
            'manage_bookings',
            'view_analytics',
            'view_notifications'
          ],
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        }
      ];

      for (const admin of admins) {
        await setDoc(doc(db, 'admins', admin.email), admin);
        console.log(`Admin ${admin.email} initialized`);
      }

      return { success: true, message: 'Admins initialized successfully' };
    } catch (error) {
      console.error('Error initializing admins:', error);
      throw error;
    }
  }

  // Initialize sample users
  static async initializeUsers() {
    try {
      const users = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+91 98765 43220',
          role: 'user',
          isActive: true,
          createdAt: serverTimestamp(),
          profile: {
            address: 'Sector 15, Noida',
            preferences: ['electrician', 'plumber']
          }
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+91 98765 43221',
          role: 'user',
          isActive: true,
          createdAt: serverTimestamp(),
          profile: {
            address: 'Sector 18, Noida',
            preferences: ['beauty', 'wellness']
          }
        },
        {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone: '+91 98765 43222',
          role: 'provider',
          isActive: true,
          createdAt: serverTimestamp(),
          profile: {
            address: 'Sector 22, Noida',
            businessName: 'Mike Electrical Services',
            serviceType: 'Electrician'
          }
        }
      ];

      for (const user of users) {
        await addDoc(collection(db, 'users'), user);
        console.log(`User ${user.email} initialized`);
      }

      return { success: true, message: 'Users initialized successfully' };
    } catch (error) {
      console.error('Error initializing users:', error);
      throw error;
    }
  }

  // Initialize sample providers
  static async initializeProviders() {
    try {
      const providers = [
        {
          name: 'Rajesh Kumar',
          businessName: 'Rajesh Electrical Services',
          serviceType: 'Electrician',
          email: 'rajesh@electricalservices.com',
          phone: '+91 98765 43210',
          address: 'Sector 15, Noida',
          description: 'Professional electrical services for homes and offices',
          experience: '10 years',
          rating: 4.8,
          totalReviews: 127,
          isApproved: true,
          isActive: true,
          totalBookings: 89,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        {
          name: 'Amit Sharma',
          businessName: 'Sharma Plumbing Works',
          serviceType: 'Plumber',
          email: 'amit@plumbingworks.com',
          phone: '+91 98765 43211',
          address: 'Sector 18, Noida',
          description: 'Expert plumbing solutions for all your needs',
          experience: '8 years',
          rating: 4.6,
          totalReviews: 89,
          isApproved: true,
          isActive: true,
          totalBookings: 76,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        {
          name: 'Priya Singh',
          businessName: 'Priya Wedding Services',
          serviceType: 'Wedding Services',
          email: 'priya@weddingservices.com',
          phone: '+91 98765 43212',
          address: 'Sector 22, Noida',
          description: 'Complete wedding planning and decoration services',
          experience: '12 years',
          rating: 4.9,
          totalReviews: 156,
          isApproved: true,
          isActive: true,
          totalBookings: 45,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        {
          name: 'Vikram Tailor',
          businessName: 'Vikram Tailoring House',
          serviceType: 'Cloth Shop & Tailor',
          email: 'vikram@example.com',
          phone: '+91 98765 43213',
          address: 'Sector 12, Noida',
          description: 'Professional tailoring services for men and women',
          experience: '8 years',
          rating: 0,
          totalReviews: 0,
          isApproved: false, // Pending approval
          isActive: false,
          totalBookings: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      ];

      for (const provider of providers) {
        await addDoc(collection(db, 'providers'), provider);
        console.log(`Provider ${provider.name} initialized`);
      }

      return { success: true, message: 'Providers initialized successfully' };
    } catch (error) {
      console.error('Error initializing providers:', error);
      throw error;
    }
  }

  // Initialize sample bookings
  static async initializeBookings() {
    try {
      const bookings = [
        {
          userId: 'user1',
          providerId: 'provider1',
          serviceType: 'Electrician',
          customerName: 'Rajesh Kumar',
          customerPhone: '+91 98765 43210',
          customerEmail: 'rajesh@example.com',
          serviceDate: '2024-01-15',
          serviceTime: '10:00 AM',
          location: 'Sector 15, Noida',
          address: '123, ABC Apartments, Sector 15, Noida',
          additionalNotes: 'Need urgent electrical repair',
          status: 'pending',
          totalAmount: 2500,
          providerName: 'Rajesh Electrical Services',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        {
          userId: 'user2',
          providerId: 'provider2',
          serviceType: 'Plumber',
          customerName: 'Priya Sharma',
          customerPhone: '+91 98765 43211',
          customerEmail: 'priya@example.com',
          serviceDate: '2024-01-15',
          serviceTime: '02:00 PM',
          location: 'Sector 18, Noida',
          address: '456, XYZ Society, Sector 18, Noida',
          additionalNotes: 'Bathroom pipe repair needed',
          status: 'accepted',
          totalAmount: 1800,
          providerName: 'Sharma Plumbing Works',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        {
          userId: 'user3',
          providerId: 'provider3',
          serviceType: 'Wedding Services',
          customerName: 'Amit Singh',
          customerPhone: '+91 98765 43212',
          customerEmail: 'amit@example.com',
          serviceDate: '2024-01-16',
          serviceTime: '09:00 AM',
          location: 'Sector 22, Noida',
          address: '789, PQR Complex, Sector 22, Noida',
          additionalNotes: 'Complete wedding arrangements needed',
          status: 'completed',
          totalAmount: 15000,
          providerName: 'Priya Wedding Services',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      ];

      for (const booking of bookings) {
        await addDoc(collection(db, 'bookings'), booking);
        console.log(`Booking for ${booking.customerName} initialized`);
      }

      return { success: true, message: 'Bookings initialized successfully' };
    } catch (error) {
      console.error('Error initializing bookings:', error);
      throw error;
    }
  }

  // Initialize sample notifications
  static async initializeNotifications() {
    try {
      const notifications = [
        {
          title: 'New Provider Registration',
          message: 'Vikram Tailor has submitted a registration request',
          type: 'provider_registration',
          isRead: false,
          priority: 'high',
          actionUrl: '/admin/providers?status=pending',
          createdAt: serverTimestamp()
        },
        {
          title: 'Booking Completed',
          message: 'Booking #BK001 has been completed successfully',
          type: 'booking_completed',
          isRead: false,
          priority: 'medium',
          actionUrl: '/admin/bookings',
          createdAt: serverTimestamp()
        },
        {
          title: 'Payment Received',
          message: 'Payment of ₹2,500 received for booking #BK002',
          type: 'payment_received',
          isRead: true,
          priority: 'low',
          actionUrl: '/admin/bookings',
          createdAt: serverTimestamp()
        },
        {
          title: 'System Alert',
          message: 'High server load detected. Consider scaling resources.',
          type: 'system_alert',
          isRead: false,
          priority: 'high',
          actionUrl: '/admin/settings',
          createdAt: serverTimestamp()
        }
      ];

      for (const notification of notifications) {
        await addDoc(collection(db, 'notifications'), notification);
        console.log(`Notification "${notification.title}" initialized`);
      }

      return { success: true, message: 'Notifications initialized successfully' };
    } catch (error) {
      console.error('Error initializing notifications:', error);
      throw error;
    }
  }

  // Initialize all collections
  static async initializeAll() {
    try {
      console.log('Starting Firebase initialization...');
      
      await this.initializeAdmins();
      await this.initializeUsers();
      await this.initializeProviders();
      await this.initializeBookings();
      await this.initializeNotifications();
      
      console.log('Firebase initialization completed successfully!');
      return { success: true, message: 'All collections initialized successfully' };
    } catch (error) {
      console.error('Error during Firebase initialization:', error);
      throw error;
    }
  }
}

// Usage example:
// import { FirebaseSetupService } from '@/lib/firebase-setup';
// FirebaseSetupService.initializeAll();
