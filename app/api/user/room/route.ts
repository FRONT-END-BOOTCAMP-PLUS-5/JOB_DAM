import { createClient } from '@/app/utils/supabase/server';
import { GetChatRoomUseCase } from '@/backend/users/application/usecases/GetChatRoomUseCase';
import { SbChatRepository } from '@/backend/users/repositories/SbChatRepository';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const param: string = url.searchParams.get('id') || '1';

  const supabase: SupabaseClient = await createClient(); // supabse 불러오기
  const chatRoomRepository = new SbChatRepository(supabase); // 쿼리로 supabase 데이터 불러오기
  const getChatRoomUsecase = new GetChatRoomUseCase(chatRoomRepository); // 가져온 데이터 가공
  const chatRooms = await getChatRoomUsecase.execute(param); // 가공된 데이터 반환

  return NextResponse.json(chatRooms);
}
