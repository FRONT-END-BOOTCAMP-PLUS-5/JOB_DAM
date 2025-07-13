import { SupabaseClient } from '@supabase/supabase-js';
import { ChatRepository } from '../domain/repositories/ChatRepository';

export class SbChatRepository implements ChatRepository {
  private supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findById(member_id: string) {
    const { data: chatMembers, error: chatMemberError } = await this.supabase
      .from('chat_member')
      .select('chat_room_id')
      .eq('member_id', member_id);

    if (chatMemberError) throw new Error(chatMemberError.message);

    const chatRoomIds = chatMembers.map((cm) => cm.chat_room_id);

    const { data: chatRooms, error: chatRoomError } = await this.supabase
      .from('chat_room')
      .select(
        `
        *,
        chat_member(*),
        member!chat_room_created_member_id_fkey(*)
      `,
      )
      .in('id', chatRoomIds);

    if (chatRoomError) throw new Error(chatRoomError.message);

    return chatRooms;
  }
}
