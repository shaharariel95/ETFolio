// API route to handle password change
// app/api/settings/password/route.ts
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request) {
    const session = await getServerSession();
    const { currentPassword, newPassword } = await req.json();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    console.log(`found user: ${user}`)
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log(`user pass: ${user.password}`)
    if (user.password !== undefined) {
        console.log(`user pass wanst undefind`)
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        console.log(`is the password matching: ${isMatch}`)
        if (!isMatch) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
        }
    }
    console.log(`new password: ${newPassword}`)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`new hashedPassword: ${hashedPassword}`)
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' });
}
