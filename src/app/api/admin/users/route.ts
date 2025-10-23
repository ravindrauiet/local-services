import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would come from Firebase
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43220',
    role: 'user',
    joinedAt: '2024-01-01',
    totalBookings: 3,
    isActive: true,
    lastLogin: '2024-01-15T10:30:00Z',
    profile: {
      address: 'Sector 15, Noida',
      preferences: ['Electrician', 'Plumber']
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 98765 43221',
    role: 'user',
    joinedAt: '2024-01-05',
    totalBookings: 1,
    isActive: true,
    lastLogin: '2024-01-14T15:20:00Z',
    profile: {
      address: 'Sector 18, Noida',
      preferences: ['Beauty & Wellness']
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+91 98765 43222',
    role: 'provider',
    joinedAt: '2023-12-15',
    totalBookings: 0,
    isActive: true,
    lastLogin: '2024-01-15T09:15:00Z',
    profile: {
      businessName: 'Mike Services',
      serviceType: 'Carpenter',
      address: 'Sector 20, Noida'
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+91 98765 43223',
    role: 'user',
    joinedAt: '2024-01-10',
    totalBookings: 0,
    isActive: false,
    lastLogin: '2024-01-12T14:45:00Z',
    profile: {
      address: 'Sector 22, Noida',
      preferences: []
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'joinedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    let users = [...mockUsers];

    // Filter by role
    if (role && role !== 'all') {
      users = users.filter(user => user.role === role);
    }

    // Filter by status
    if (status === 'active') {
      users = users.filter(user => user.isActive);
    } else if (status === 'inactive') {
      users = users.filter(user => !user.isActive);
    }

    // Filter by search term
    if (search) {
      users = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
      );
    }

    // Sort users
    users.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, data } = body;

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Update user data in Firebase
    // 3. Send notifications if needed

    console.log(`User ${userId} ${action}:`, data);

    return NextResponse.json({
      success: true,
      message: `User ${action} successfully`
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Verify admin authentication
    // 2. Soft delete user from Firebase
    // 3. Handle related data cleanup
    // 4. Notify user if needed

    console.log(`Deleting user: ${userId}`);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
