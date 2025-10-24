import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from Firebase
const mockSettings = {
  platform: {
    name: 'Mithila Shilpi',
    description: 'Connect with verified craftsmen and service providers in your area',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    defaultCurrency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'en'
  },
  business: {
    commissionRate: 10,
    minimumBookingAmount: 500,
    maximumBookingAmount: 50000,
    autoApproveProviders: false,
    requireProviderVerification: true,
    allowGuestBookings: true
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    adminEmail: 'admin@mithilashilpi.com',
    supportEmail: 'support@mithilashilpi.com',
    notificationEmail: 'notifications@mithilashilpi.com'
  },
  payment: {
    paymentMethods: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'],
    defaultPaymentMethod: 'UPI',
    paymentGateway: 'razorpay',
    enableWallet: true,
    enableCOD: false
  },
  serviceCategories: [
    {
      id: '1',
      name: 'Electrician',
      icon: 'BoltIcon',
      description: 'Electrical repairs, installations, and maintenance',
      isActive: true,
      sortOrder: 1
    },
    {
      id: '2',
      name: 'Plumber',
      icon: 'WrenchScrewdriverIcon',
      description: 'Plumbing repairs, installations, and maintenance',
      isActive: true,
      sortOrder: 2
    },
    {
      id: '3',
      name: 'Wedding Services',
      icon: 'HeartIcon',
      description: 'Pandits, samagri, and wedding arrangements',
      isActive: true,
      sortOrder: 3
    },
    {
      id: '4',
      name: 'Cloth Shop & Tailor',
      icon: 'ScissorsIcon',
      description: 'Clothing, alterations, and custom tailoring',
      isActive: true,
      sortOrder: 4
    },
    {
      id: '5',
      name: 'RO & AC Services',
      icon: 'CogIcon',
      description: 'Water purifier and air conditioner services',
      isActive: true,
      sortOrder: 5
    },
    {
      id: '6',
      name: 'Beauty & Wellness',
      icon: 'SparklesIcon',
      description: 'Salons, spas, and beauty treatments',
      isActive: true,
      sortOrder: 6
    }
  ],
  features: {
    enableReviews: true,
    enableRatings: true,
    enableChat: true,
    enableVideoCall: false,
    enableLocationTracking: true,
    enableRealTimeUpdates: true
  },
  security: {
    enableTwoFactorAuth: false,
    sessionTimeout: 24, // hours
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Fetch settings from Firebase
    // 3. Apply user-specific permissions

    // Return specific section if requested
    if (section && section in mockSettings) {
      return NextResponse.json({
        success: true,
        data: { [section]: mockSettings[section as keyof typeof mockSettings] }
      });
    }

    return NextResponse.json({
      success: true,
      data: mockSettings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Validate settings data
    // 3. Update settings in Firebase
    // 4. Apply settings changes
    // 5. Log changes for audit

    console.log(`Updating ${section} settings:`, data);

    // Validate section exists
    if (section && !(section in mockSettings)) {
      return NextResponse.json(
        { success: false, error: 'Invalid settings section' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Validate action and data
    // 3. Perform the requested action

    if (action === 'addServiceCategory') {
      console.log('Adding new service category:', data);
    } else if (action === 'updateServiceCategory') {
      console.log('Updating service category:', data);
    } else if (action === 'deleteServiceCategory') {
      console.log('Deleting service category:', data);
    } else if (action === 'resetSettings') {
      console.log('Resetting settings to default');
    } else if (action === 'exportSettings') {
      console.log('Exporting settings');
    } else if (action === 'importSettings') {
      console.log('Importing settings:', data);
    }

    return NextResponse.json({
      success: true,
      message: 'Action completed successfully'
    });
  } catch (error) {
    console.error('Error performing settings action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}
