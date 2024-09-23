// API route to handle name change
// app/api/settings/name/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request) {
    const session = await getServerSession();
    const { name } = await req.json();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        await User.findOneAndUpdate({ email: session.user.email }, { name });

    } catch {
        return NextResponse.json({ message: "problem updating the user in DB" }, { status: 501 })
    }

    return NextResponse.json({ message: 'Name updated successfully' });
}
