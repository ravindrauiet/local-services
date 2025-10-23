import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from Firebase
const mockNotifications = [
  {
    id: '1',
    title: 'New Provider Registration',
    message: 'Vikram Tailor has submitted a registration request',
    type: 'provider_registration',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z',
    priority: 'high',
    actionUrl: '/admin/providers?status=pending',
    metadata: {
      providerId: '3',
      providerName: 'Vikram Tailor',
      serviceType: 'Cloth Shop & Tailor'
    }
  },
  {
    id: '2',
    title: 'Booking Completed',
    message: 'Booking #BK001 has been completed successfully',
    type: 'booking_completed',
    isRead: false,
    createdAt: '2024-01-15T09:15:00Z',
    priority: 'medium',
    actionUrl: '/admin/bookings',
    metadata: {
      bookingId: 'BK001',
      customerName: 'Rajesh Kumar',
      amount: 2500
    }
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of ₹2,500 received for booking #BK002',
    type: 'payment_received',
    isRead: true,
    createdAt: '2024-01-14T16:45:00Z',
    priority: 'low',
    actionUrl: '/admin/bookings',
    metadata: {
      bookingId: 'BK002',
      amount: 2500,
      paymentMethod: 'UPI'
    }
  },
  {
    id: '4',
    title: 'System Alert',
    message: 'High server load detected. Consider scaling resources.',
    type: 'system_alert',
    isRead: false,
    createdAt: '2024-01-14T14:20:00Z',
    priority: 'high',
    actionUrl: '/admin/settings',
    metadata: {
      alertType: 'server_load',
      severity: 'warning'
    }
  },
  {
    id: '5',
    title: 'New User Registration',
    message: '5 new users registered today',
    type: 'user_registration',
    isRead: true,
    createdAt: '2024-01-14T12:00:00Z',
    priority: 'low',
    actionUrl: '/admin/users',
    metadata: {
      count: 5,
      timeRange: 'today'
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const isRead = searchParams.get('isRead');
    const priority = searchParams.get('priority');
    const limit = parseInt(searchParams.get('limit') || '50');

    let notifications = [...mockNotifications];

    // Filter by type
    if (type && type !== 'all') {
      notifications = notifications.filter(notification => notification.type === type);
    }

    // Filter by read status
    if (isRead !== null) {
      const readStatus = isRead === 'true';
      notifications = notifications.filter(notification => notification.isRead === readStatus);
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      notifications = notifications.filter(notification => notification.priority === priority);
    }

    // Sort by creation date (newest first)
    notifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Limit results
    notifications = notifications.slice(0, limit);

    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    return NextResponse.json({
      success: true,
      data: notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, action } = body;

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Update notification status in Firebase
    // 3. Update real-time notifications

    if (action === 'markAsRead') {
      console.log(`Marking notification ${notificationId} as read`);
    } else if (action === 'markAllAsRead') {
      console.log('Marking all notifications as read');
    }

    return NextResponse.json({
      success: true,
      message: 'Notification updated successfully'
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, message, type, priority, targetUsers } = body;

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Create notification in Firebase
    // 3. Send real-time notifications
    // 4. Send email/SMS if needed

    const newNotification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      priority: priority || 'medium',
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/admin',
      metadata: {}
    };

    console.log('Creating new notification:', newNotification);

    return NextResponse.json({
      success: true,
      data: newNotification,
      message: 'Notification created successfully'
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get('id');

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Delete notification from Firebase

    console.log(`Deleting notification: ${notificationId}`);

    return NextResponse.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
