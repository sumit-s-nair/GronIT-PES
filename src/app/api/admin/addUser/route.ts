import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(token);
    console.log('Request add user by user', decodedToken.email, decodedToken.name);

    // Parse the request body to get the email
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Create a new user in Firebase Auth
    const newUser = await auth.createUser({
      email,
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);

    // Handle specific Firebase errors
    if ((error as { code: string }).code === 'auth/email-already-exists') {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
