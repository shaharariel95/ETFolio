// app/api/etfs/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ETF from '@/models/ETF';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const { symbol, name, shares, purchaseDate, purchaseCost, currentPrice } = await req.json();

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
        return NextResponse.json({ message: 'Error in finding user in DB' }, { status: 401 });
    }
    const etf = new ETF({
        userId: dbUser.id, // Use the user ID from the session
        symbol,
        name,
        shares,
        purchaseCost,
        purchaseDate,
        currentPrice,
    });

    await etf.save();

    return NextResponse.json({ message: 'ETF added successfully' });
}
