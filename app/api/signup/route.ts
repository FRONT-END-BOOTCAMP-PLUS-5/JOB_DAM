import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMemberRepository } from '../../../backend/members/repositories/SbMemberRepository';
import { GetOneMemberUseCase } from '../../../backend/signups/application/usecases/GetOneMemberUseCase';

export async function POST(request: NextRequest) {
  const body = await request.json(); // 🔹 1. 클라이언트 요청 데이터 추출

  const memberData = {
    nickname: body.nickname,
    name: body.name,
    email: body.email,
    password: body.password,
    img: body.img || null,
    type: body.type,
    grade: body.grade,
    point: body.point || 0,
  };

  try {
    const supabase: SupabaseClient = await createClient(); // 🔹 2. 데이터베이스 연결

    const memberRepository = new SbMemberRepository(supabase, memberData); // 🔹 3. 인프라 계층 생성

    // 🔹 이메일 중복 체크 (이메일만으로 체크)
    const { data: existingMembers, error: checkError } = await supabase
      .from('member')
      .select('id')
      .eq('email', body.email);

    if (checkError) {
      return NextResponse.json({ message: checkError.message, status: 500 });
    }

    if (existingMembers && existingMembers.length > 0) {
      return NextResponse.json({ message: '이미 존재하는 이메일입니다.', status: 409 });
    }

    // 🔹 중복이 없으므로 회원가입 진행
    const insertedMemberData = await memberRepository.insertMember();

    return NextResponse.json({ result: insertedMemberData, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}
