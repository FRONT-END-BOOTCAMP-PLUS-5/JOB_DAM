import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';
import { SbMemberRepository } from '@/backend/members/repositories/SbMemberRepository';
import { GetMemberListUsecase } from '@/backend/members/application/usecases/GetMemberListUsecase';

export async function GET(request: NextRequest) {
  try{
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') as string;

    const supabase: SupabaseClient = await createClient();
    const memberRepository = new SbMemberRepository(supabase);
    const getMemberUseCase = new GetMemberListUsecase(memberRepository); // 가져온 데이터 가공
    const member = await getMemberUseCase.getOneMember(id); // 가공된 데이터 반환
    return NextResponse.json({result: member, status: 200 });
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({message: err.message, status: 500});
    }
  }
}