import { RefreshToken } from '@/app/services/login/refreshToken';
import { passwordDecrypto } from '@/app/utils/signup/passwordCrypto';
import { generateAccessToken, generateRefreshToken } from '@/app/utils/signup/token';
import { verifyAccessToken } from '@/app/utils/signup/tokenVerify';
import { createClient } from '@/app/utils/supabase/server';
import { GetLoginUserIdUseCase } from '@/backend/login/application/usecases/GetLoginUserIdUseCase';
import { GetLoginUserUseCase } from '@/backend/login/application/usecases/GetLoginUserUseCase';
import { SbLoginRepository } from '@/backend/login/repository/SbLoginRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const supabase = await createClient();

    const loginRepository = new SbLoginRepository(supabase);

    const memberEmail = await new GetLoginUserUseCase(loginRepository).execute(email);
    const decryptoPassword = passwordDecrypto(memberEmail.password);

    if (!memberEmail) {
      return NextResponse.json({ status: 409, message: '일치하는 이메일이 없습니다.' });
    } else {
      if (decryptoPassword !== password) {
        return NextResponse.json({ status: 409, message: '비밀번호가 일치하지 않습니다.' });
      }
    }

    const access_token = generateAccessToken(memberEmail.id.toString());
    const refresh_token = generateRefreshToken(memberEmail.id.toString());

    const response = NextResponse.json({
      user: { ...memberEmail, access_token, refresh_token },
      status: 200,
    });

    response.cookies.set('access_token', access_token, {
      sameSite: 'lax',
      maxAge: 60 * 15,
      path: '/',
      httpOnly: true,
    });

    response.cookies.set('refresh_token', refresh_token, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ message: '토큰이 없습니다', status: 401 });
    }

    if (!refreshToken) {
      return NextResponse.json({ message: '로그인을 다시 해주세요', status: 401 });
    }

    // 1️⃣ 토큰 검증만 하고
    const { userId } = verifyAccessToken(accessToken);

    // 2️⃣ DB에서 사용자 정보 조회
    const supabase = await createClient();
    const loginRepository = new SbLoginRepository(supabase);
    const memberData = await new GetLoginUserIdUseCase(loginRepository).execute(userId);

    // 3️⃣ 사용자 정보만 반환 (토큰 갱신 X)
    return NextResponse.json({
      user: memberData,
      accessToken: accessToken,
      refreshToken: refreshToken,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: '인증 실패',
        status: 401,
      });
    }
  }
}
