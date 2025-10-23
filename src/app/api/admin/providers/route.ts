import { NextRequest, NextResponse } from 'next/server';
import { FirebaseAdminService } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication verification here
    // const admin = await verifyAdminAuth(request);
    // if (!admin) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Fetch real data from Firebase
    const providers = await FirebaseAdminService.getProviders({
      status: status as any,
      search: search || undefined,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc'
    });

    return NextResponse.json({
      success: true,
      data: providers
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // TODO: Add admin authentication verification here
    // const admin = await verifyAdminAuth(request);
    // if (!admin) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { providerId, action, status } = body;

    let result = false;
    let message = '';

    if (action === 'approve') {
      result = await FirebaseAdminService.updateProviderStatus(providerId, {
        isApproved: true,
        isActive: true
      });
      message = 'Provider approved successfully';
    } else if (action === 'toggleStatus') {
      // First get current status
      const providers = await FirebaseAdminService.getProviders();
      const provider = providers.find(p => p.id === providerId);
      if (provider) {
        result = await FirebaseAdminService.updateProviderStatus(providerId, {
          isActive: !provider.isActive
        });
        message = `Provider ${!provider.isActive ? 'activated' : 'deactivated'} successfully`;
      }
    }

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Provider not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message
    });
  } catch (error) {
    console.error('Error updating provider:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add admin authentication verification here
    // const admin = await verifyAdminAuth(request);
    // if (!admin) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get('id');

    if (!providerId) {
      return NextResponse.json(
        { success: false, error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    // Delete provider from Firebase
    const result = await FirebaseAdminService.deleteProvider(providerId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Provider not found or deletion failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Provider deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting provider:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete provider' },
      { status: 500 }
    );
  }
}
