import { createClient } from '@/app/utils/supabase/server';
import { UpdateMemberPointUseCase } from '@/backend/members/application/usecases/UpdateMemberPointUseCase';
import { SbMemberRepository } from '@/backend/members/repositories/SbMemberRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const memberRepository = new SbMemberRepository(supabase, body);
    const memberPoint = new UpdateMemberPointUseCase(memberRepository).update(body.member_id, body.point);

    return NextResponse.json({ result: memberPoint, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 503 });
    }
  }
}
