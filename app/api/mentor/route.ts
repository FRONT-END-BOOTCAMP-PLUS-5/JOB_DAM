import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMentorRepository } from '../../../backend/mentors/repositories/SbMentorRepository';
import { GetMentorUseCase } from '../../../backend/mentors/application/usecases/GetMentorUseCase';
import { CreateMentorUseCase } from '../../../backend/users/application/usecases/CreateMentorUseCase';
import { GetOneMentorUseCase } from '../../../backend/users/application/usecases/GetOneMentorUseCase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const mentorRepository = new SbMentorRepository(supabase, body);
    const mentor = new CreateMentorUseCase(mentorRepository).create();

    return NextResponse.json({ result: mentor, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const param: string = url.searchParams.get('id') || '1';

  const supabase: SupabaseClient = await createClient();
  const mentorRepository = new SbMentorRepository(supabase);

  let mentor;

  if (param !== '1') {
    const getOneMentorUseCase = new GetOneMentorUseCase(mentorRepository);
    mentor = await getOneMentorUseCase.execute(param);
  } else {
    const getMentorUseCase = new GetMentorUseCase(mentorRepository);
    mentor = await getMentorUseCase.execute();
  }

  return NextResponse.json(mentor);
}
