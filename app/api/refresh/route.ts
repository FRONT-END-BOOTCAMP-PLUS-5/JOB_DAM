import { generateAccessToken } from '@/app/utils/signup/token';
import { verifyRefreshToken } from '@/app/utils/signup/tokenVerify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: '리프레시 토큰이 없습니다', status: 401 });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const userId = decoded?.userId;

    const newAccessToken = generateAccessToken(userId);

    const response = NextResponse.json({
      accessToken: newAccessToken,
      status: 200,
    });

    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ message: '리프레시 토큰 갱신 실패', status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      const response = NextResponse.json({ message: '리프레시 토큰 삭제 성공', status: 200 });
      response.cookies.delete('refresh_token');

      return response;
    }
  } catch {
    return NextResponse.json({ message: '리프레시 토큰 삭제 실패', status: 400 });
  }
}
