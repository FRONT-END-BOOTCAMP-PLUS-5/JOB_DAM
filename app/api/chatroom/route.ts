import { createClient } from '@/app/utils/supabase/server';
import { CreateChatRoomUseCase } from '@/backend/chatrooms/application/usecases/CreateChatRoomUseCase';
import { SbChatRoomRepository } from '@/backend/chatrooms/repositories/SbChatRoomRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const chatroomRepository = new SbChatRoomRepository(supabase, body);
    const chatroom = new CreateChatRoomUseCase(chatroomRepository).create();

    return NextResponse.json({ result: chatroom, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}
