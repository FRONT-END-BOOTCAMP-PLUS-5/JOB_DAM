import { NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';
import { SbMemberRepository } from '@/app/(backend)/repositories/SbMemberRepository';
import { GetMemberListUsecase } from '@/app/(backend)/application/usecases/member/GetMemberListUsecase';

export async function GET() {
  try{
    const supabase: SupabaseClient = await createClient();
    const memberRepository = new SbMemberRepository(supabase);
    const getMemberUseCase = new GetMemberListUsecase(memberRepository); // 가져온 데이터 가공
    const members = await getMemberUseCase.execute(); // 가공된 데이터 반환
    return NextResponse.json({result: {...members}, status: 200 });
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({message: err.message, status: 500});
    }
  }
}