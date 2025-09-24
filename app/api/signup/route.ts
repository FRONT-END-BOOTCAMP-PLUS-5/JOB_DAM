import { createAdminClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMemberRepository } from '../../../backend/members/repositories/SbMemberRepository';
import { passwordCrypto } from '@/app/utils/signup/passwordCrypto';
import { GetMemberUseCase } from '@/backend/members/application/usecases/GetMemberUseCase';
import { CreateMemberUseCase } from '@/backend/members/application/usecases/CreateMemberUseCase';

export async function POST(request: NextRequest) {
  const body = await request.json(); // 🔹 1. 클라이언트 요청 데이터 추출

  const memberData = {
    nickname: body.nickname,
    name: body.name,
    email: body.email,
    password: passwordCrypto(body.password),
    img: body.img || null,
    type: body.type || 0,
    grade: body.grade || 0,
    point: body.point || 0,
  };

  try {
    const supabase: SupabaseClient = await createAdminClient(); // 🔹 2. 관리자 권한으로 데이터베이스 연결 (RLS 우회)

    const memberRepository = new SbMemberRepository(supabase, memberData); // 🔹 3. 인프라 계층 생성

    const member = await new GetMemberUseCase(memberRepository).execute();

    const memberEmail = member.members.find((member) => member.email === body.email);
    const memberNickname = member.members.find((member) => member.nickname === body.nickname);
    const memberName = member.members.find((member) => member.name === body.name);

    if (memberEmail) {
      return NextResponse.json({ message: '이미 존재하는 이메일입니다.', status: 409 });
    }

    if (memberNickname) {
      return NextResponse.json({ message: '이미 존재하는 닉네임입니다.', status: 409 });
    }

    if (memberName) {
      return NextResponse.json({ message: '이미 존재하는 이름입니다.', status: 409 });
    }

    const insertedMemberData = await new CreateMemberUseCase(memberRepository).create();

    return NextResponse.json({ result: insertedMemberData, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}
