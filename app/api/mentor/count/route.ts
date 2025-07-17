import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { MentorCountRepository } from '@/backend/mentors/repositories/MentorCountRepository';
import { GetMentorCountUseCase } from '@/backend/mentors/application/usecases/GetMentorCountUseCase';

export async function GET() {
    
    const supabase: SupabaseClient = await createClient();
    const mentorCRepository = new MentorCountRepository(supabase);
    const getMentorCount = new GetMentorCountUseCase(mentorCRepository);
    const memberCount = await getMentorCount.execute();
    
    return NextResponse.json(memberCount);
}