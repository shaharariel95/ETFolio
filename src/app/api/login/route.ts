import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';


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

    // init the response with the user data
    const response = NextResponse.json({
        message: 'Login successful',
        firstName: user.firstName,
        lastName: user.lastName
    });

    return response;
}
