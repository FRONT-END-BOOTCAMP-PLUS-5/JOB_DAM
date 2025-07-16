import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { ChatroomCountRepository } from '@/backend/chatrooms/repositories/ChatroomCountRepository';
import { GetMentorRoomCountUseCase } from '@/backend/chatrooms/application/usecases/GetMentorRoomCountUseCase';

export async function GET() {
    
    const supabase: SupabaseClient = await createClient();
    const chatroomCRepository = new ChatroomCountRepository(supabase);
    const getCCount = new GetMentorRoomCountUseCase(chatroomCRepository);
    const memberCount = await getCCount.execute();
    
    return NextResponse.json(memberCount);
}