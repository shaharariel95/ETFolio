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

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.password !== undefined) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
        }
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'Password updated successfully' });
}
