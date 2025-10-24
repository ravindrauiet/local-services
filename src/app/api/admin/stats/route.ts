import { NextRequest, NextResponse } from 'next/server';
import { FirebaseAdminService } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // TODO: Add admin authentication verification here
    // const admin = await verifyAdminAuth(request);
    // if (!admin) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    // Fetch real data from Firebase
    const stats = await FirebaseAdminService.getAdminStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
