// app/api/etfs/user/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ETF from '@/models/ETF';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    console.log(`userid: ${session.user.id}`)
    const etfs = await ETF.find({ userId: session.user.id });
    console.log(`etfs: `, etfs)

    return NextResponse.json(etfs);
}
