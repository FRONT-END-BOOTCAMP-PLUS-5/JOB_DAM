import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbMentorRepository } from '../../repositories/SbMentorRepository';
import { CreateMentorUseCase } from '../../application/usecases/mypage/CreateMentorUseCase';

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
