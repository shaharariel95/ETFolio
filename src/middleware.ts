import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const tempToken = req.cookies.get('token');
    const token = tempToken?.value
    const authToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const response = NextResponse.next();

    if (authToken?.customToken && !token) {
        response.cookies.set('token', authToken.customToken as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60, // 1 day
            path: '/',
        });
    }

    if (!token && !authToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        let mainToken: string = ""
        if (authToken?.customToken) mainToken = authToken?.customToken as string
        if (token) mainToken = token
        const { payload } = await jwtVerify(mainToken, JWT_SECRET); // Verify JWT token
        console.log('Verified payload:', payload); // You can access userId from payload
        return response;
    } catch (err) {
        console.error('JWT verification failed:', err);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'], // Apply middleware only to protected routes
};
