import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

function lerToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

export function proxy(request) {
    const usuario = lerToken(request.cookies.get('token')?.value);
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') && !usuario?.isAdmin) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname === '/login' && usuario) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};