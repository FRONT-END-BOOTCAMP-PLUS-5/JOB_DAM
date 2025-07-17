import { createClient } from '@/app/utils/supabase/server';
import { GetMentorListUseCase } from '@/backend/members/application/usecases/GetMentorListUseCase';
import { SbMemberRepository } from '@/backend/members/repositories/SbMemberRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase: SupabaseClient = await createClient();

  const mentorRepository = new SbMemberRepository(supabase);
  const getMentorListUseCase = new GetMentorListUseCase(mentorRepository);
  const mentor = await getMentorListUseCase.execute();

  return NextResponse.json(mentor);
}
