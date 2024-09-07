// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    const { firstName, lastName, email, password } = await req.json();

    // Connect to MongoDB
    await connectToDatabase();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
    });

    // Save user
    try {
        console.log(`trying to save a new user ${newUser.email}`)
        await newUser.save();
        console.log(`saved a new user ${newUser.email}`)
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.log(`error in saving a new user ${newUser.email}`)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
