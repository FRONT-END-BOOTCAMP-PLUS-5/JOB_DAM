import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMemberRepository } from '../../repositories/SbMemberRepository';
import { GetOneMemberUseCase } from '../../application/usecases/member/GetOneMemberUseCase';

export async function POST(request: NextRequest) {
  const body = await request.json(); // 🔹 1. 클라이언트 요청 데이터 추출

  const memberData = {
    nickname: body.nickname,
    name: body.name,
    email: body.email,
    password: body.password,
    img: body.img || null,
  };

  try {
    const supabase: SupabaseClient = await createClient(); // 🔹 2. 데이터베이스 연결

    const memberRepository = new SbMemberRepository(supabase, memberData); // 🔹 3. 인프라 계층 생성

    // 🔹 중복 체크를 try-catch로 감싸기
    try {
      const member = await new GetOneMemberUseCase(memberRepository).execute(body.email, body.password);

      // 회원이 존재하면 중복
      if (member) {
        return NextResponse.json({ message: '이미 존재하는 회원입니다.', status: 409 });
      }
    } catch (error) {
      // 회원이 없음 = 정상적으로 회원가입 진행
      console.log('중복 체크 완료 - 새 회원 가입 진행', error);
    }

    // 🔹 중복이 없으므로 회원가입 진행
    const insertedMemberData = await memberRepository.insertMember();
    console.log('회원가입 성공:', insertedMemberData);
    return NextResponse.json({ result: insertedMemberData, status: 200 });
  } catch (err) {
    console.error('회원가입 에러:', err);
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}
