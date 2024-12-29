import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

export async function DELETE(req: Request) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);
    console.log('Request delete user by user', decodedToken.email, decodedToken.name);

    // Parse the request body to get the userId
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Delete the user in Firebase Auth
    await auth.deleteUser(userId);

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);

    // Handle specific Firebase errors
    if ((error as { code: string }).code === 'auth/user-not-found') {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
