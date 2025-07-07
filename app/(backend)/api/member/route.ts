import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMemberRepository } from '../../repositories/SbMemberRepository';
import { CreateMemberUseCase } from '../../application/usecases/member/CreateMemberUseCase';

export async function POST(request: NextRequest) {
  const body = await request.json(); // 🔹 1. 클라이언트 요청 데이터 추출

  try {
    const supabase: SupabaseClient = await createClient(); // 🔹 2. 데이터베이스 연결

    const memberRepository = new SbMemberRepository(supabase, body); // 🔹 3. 인프라 계층 생성

    const member = await new CreateMemberUseCase(memberRepository).create(); // 🔹 4. 비즈니스 로직 실행

    return NextResponse.json({ result: member, status: 200 }); // 🔹 5. 응답 반환
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}
