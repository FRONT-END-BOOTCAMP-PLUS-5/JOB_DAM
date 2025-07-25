import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMemberRepository } from '../../../backend/members/repositories/SbMemberRepository';
import { UpdateMemberPasswordUseCase } from '@/backend/members/application/usecases/UpdateMemberPasswordUseCase';
import { GetOneMemberUseCase } from '@/backend/members/application/usecases/GetOneMemberUseCase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    // null 체크
    if (!email || !password) {
      return NextResponse.json({
        message: '이메일과 패스워드가 필요합니다.',
        status: 400,
      });
    }

    const supabase: SupabaseClient = await createClient();

    // clientData 없이 Repository 생성 (로그인용)
    const memberRepository = new SbMemberRepository(supabase);

    const memberData = await new GetOneMemberUseCase(memberRepository).execute(email, password);

    return NextResponse.json({ result: memberData, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const supabase: SupabaseClient = await createClient();
  const memberRepository = new SbMemberRepository(supabase);
  const memberData = await memberRepository.findByEmail(body);

  if (!memberData) {
    return NextResponse.json({ message: '이메일이 존재하지 않습니다.', status: 404 });
  }

  return NextResponse.json({ result: memberData, status: 200 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  const supabase: SupabaseClient = await createClient();
  const memberRepository = new SbMemberRepository(supabase);
  const updateMemberPassword = new UpdateMemberPasswordUseCase(memberRepository).execute(body.email, body.password);

  return NextResponse.json({ result: updateMemberPassword, status: 200, message: '비밀번호 변경을 완료했습니다.' });
}
