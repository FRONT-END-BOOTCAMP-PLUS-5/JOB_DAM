import { createClient } from '@/app/utils/supabase/server';
import { CreateChatRoomUseCase } from '@/backend/chatrooms/application/usecases/CreateChatRoomUseCase';
import { GetAlarmChatRoomUseCase } from '@/backend/chatrooms/application/usecases/GetAlarmChatRoomUseCase';
import { UpdateChatRoomUseCase } from '@/backend/chatrooms/application/usecases/UpdateChatRoom';
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const chatroomRepository = new SbChatRoomRepository(supabase, body);
    const chatroom = new UpdateChatRoomUseCase(chatroomRepository).update(body.chat_room_id, body.progress);

    return NextResponse.json({ result: chatroom, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 503 });
    }
  }
}

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const param: string = url.searchParams.get('id') || '1';

  const supabase: SupabaseClient = await createClient();
  const alarmChatRoomRepository = new SbChatRoomRepository(supabase);
  const getAlarmChatRoomUsecase = new GetAlarmChatRoomUseCase(alarmChatRoomRepository);
  const chatRooms = await getAlarmChatRoomUsecase.execute(param);

  return NextResponse.json({ result: chatRooms, status: 200 });
}
