import { generateAccessToken, generateRefreshToken } from '@/app/utils/signup/token';
import { verifyAccessToken } from '@/app/utils/signup/tokenVerify';
import { createClient } from '@/app/utils/supabase/server';
import { SbMemberRepository } from '@/backend/members/repositories/SbMemberRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // 로그인 처리
  // 1. 이메일과 비밀번호를 받아온다.
  // 2. 이메일과 비밀번호를 확인한다.
  // 3. 이메일과 비밀번호가 일치하면 로그인 성공 메시지를 반환한다.
  // 4. 이메일과 비밀번호가 일치하지 않으면 로그인 실패 메시지를 반환한다.
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    const memberRepository = new SbMemberRepository(supabase);
    const memberData = await memberRepository.findOne(email, password);

    const access_token = generateAccessToken(memberData.id);
    const refresh_token = generateRefreshToken(memberData.id);

    if (!memberData) {
      return NextResponse.json({ message: '아이디 또는 비밀번호가 일치하지 않습니다', status: 401 });
    }

    const response = NextResponse.json({ result: memberData, status: 200 });

    response.cookies.set('access_token', access_token, {
      // 쿠키 설정
      // 1. 동일 사이트 내에서만 쿠키 전송
      // 2. 30일 동안 쿠키 유지
      // 3. 모든 경로에서 쿠키 접근 가능
      // 4. 쿠키 접근 시 보안 옵션 적용
      sameSite: 'lax',
      maxAge: 60 * 15,
      path: '/',
      httpOnly: true,
    });

    response.cookies.set('refresh_token', refresh_token, {
      // 쿠키 설정
      // 1. 동일 사이트 내에서만 쿠키 전송
      // 2. 30일 동안 쿠키 유지
      // 3. 모든 경로에서 쿠키 접근 가능
      // 4. 쿠키 접근 시 보안 옵션 적용
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: true,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message?.includes('이메일이 일치하지 않습니다.')) {
      return NextResponse.json({ message: '이메일이 일치하지 않습니다', status: 401 });
    }
    if (error instanceof Error && error.message?.includes('비밀번호가 일치하지 않습니다.')) {
      return NextResponse.json({ message: '비밀번호가 일치하지 않습니다', status: 401 });
    }
    return NextResponse.json({ message: '로그인에 실패했습니다', status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
      return NextResponse.json({ message: '토큰이 없습니다', status: 401 });
    }

    // 1️⃣ 토큰 검증만 하고
    const { userId } = verifyAccessToken(accessToken);

    // 2️⃣ DB에서 사용자 정보 조회
    const supabase = await createClient();
    const memberRepository = new SbMemberRepository(supabase);
    const memberData = await memberRepository.findById(userId);

    // 3️⃣ 사용자 정보만 반환 (토큰 갱신 X)
    return NextResponse.json({
      user: memberData,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error){
      return NextResponse.json({
        message: '인증 실패',
        status: 401,
      });
    }
  }
}
