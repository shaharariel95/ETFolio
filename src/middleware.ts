import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
    const authToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const response = NextResponse.next();

    if (!authToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        return response;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'], // Apply middleware only to protected routes
};
