import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, providerId } = body;

    if (!bookingId || !providerId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID and Provider ID are required' },
        { status: 400 }
      );
    }

    // Verify booking exists
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (!bookingSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify provider exists and get provider name
    const providerRef = doc(db, 'providers', providerId);
    const providerSnap = await getDoc(providerRef);
    
    if (!providerSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Provider not found' },
        { status: 404 }
      );
    }

    const providerData = providerSnap.data();

    // Update booking with assigned provider
    await updateDoc(bookingRef, {
      assignedProviderId: providerId,
      providerId: providerId, // Also set providerId for backward compatibility
      assignmentStatus: 'pending', // Provider needs to accept
      updatedAt: serverTimestamp(),
      assignedProviderName: providerData.name || providerData.businessName || 'Provider'
    });

    return NextResponse.json({
      success: true,
      message: 'Provider assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning provider:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to assign provider' },
      { status: 500 }
    );
  }
}

