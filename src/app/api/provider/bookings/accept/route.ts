import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, accept, providerAvailability } = body;

    if (!bookingId || accept === undefined) {
      return NextResponse.json(
        { success: false, error: 'Booking ID and accept status are required' },
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

    const bookingData = bookingSnap.data();

    // Update booking assignment status
    const updateData: any = {
      assignmentStatus: accept ? 'accepted' : 'rejected',
      updatedAt: serverTimestamp(),
    };

    if (accept && providerAvailability) {
      updateData.providerAvailability = providerAvailability;
      updateData.status = 'accepted'; // Also update booking status
    }

    await updateDoc(bookingRef, updateData);

    return NextResponse.json({
      success: true,
      message: accept ? 'Booking accepted successfully' : 'Booking rejected',
    });
  } catch (error) {
    console.error('Error updating booking acceptance:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

