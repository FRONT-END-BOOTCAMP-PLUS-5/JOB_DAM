import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { SbChatRepository } from '../../repositories/SbChatRepository';
import { NextRequest, NextResponse } from 'next/server';
import { GetChatRoomUseCase } from '../../application/usecases/chat/GetChatRoomUseCase';

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const param: string = url.searchParams.get('id') || '1';

  const supabase: SupabaseClient = await createClient(); // supabse 불러오기
  const chatRoomRepository = new SbChatRepository(supabase); // 쿼리로 supabase 데이터 불러오기
  const getChatRoomUsecase = new GetChatRoomUseCase(chatRoomRepository); // 가져온 데이터 가공
  const chatRooms = await getChatRoomUsecase.execute(param); // 가공된 데이터 반환

  return NextResponse.json(chatRooms);
}
