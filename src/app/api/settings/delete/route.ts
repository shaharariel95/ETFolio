// app/api/settings/delete/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    const { email } = await req.json();

    if (!session || session.user?.email !== email) {
        return NextResponse.json({ error: 'Email mismatch' }, { status: 400 });
    }
    try {
        await dbConnect();
        await User.findOneAndDelete({ email: session?.user?.email });
    }
    catch {
        return NextResponse.json({ message: 'Error in Deleteing account' }, { status: 400 })
    }

    return NextResponse.redirect('/api/auth/signout');
}
