import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/mentor')) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  if (request.nextUrl.pathname.startsWith('/chat')) {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  return response;
}
