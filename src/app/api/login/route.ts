import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'; // JWT for session tokens
import { SignJWT } from 'jose';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
    const { email, password } = await req.json();
    console.log(`login try from ${email}`)

    await connectToDatabase(); // Connect to DB

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    // Create a JWT token for session
    const token = await new SignJWT({ userId: user._id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(JWT_SECRET);

    // init the response with the user data
    const response = NextResponse.json({
        message: 'Login successful',
        firstName: user.firstName,
        lastName: user.lastName
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set('token', token, {
        httpOnly: true,  // Ensure the cookie is not accessible via JavaScript
        maxAge: 24 * 60 * 60,  // 1 day expiration
        path: '/',
        secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
    });

    return response;
}
