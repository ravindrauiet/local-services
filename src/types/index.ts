export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'provider' | 'admin';
  createdAt: Date;
}

export interface ServiceProvider {
  id: string;
  name: string;
  businessName?: string;
  serviceType: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  description: string;
  experience?: string;
  photo?: string;
  logo?: string;
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceDate: Date;
  serviceTime: string;
  location: string;
  address: string;
  additionalNotes?: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  totalAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'approval' | 'reminder' | 'general';
  isRead: boolean;
  createdAt: Date;
}

