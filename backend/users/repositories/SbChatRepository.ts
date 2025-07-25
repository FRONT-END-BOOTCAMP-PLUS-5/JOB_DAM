import { SupabaseClient } from '@supabase/supabase-js';
import { ChatRepository } from '../domain/repositories/ChatRepository';
import { Chat } from '../domain/entities/Chat';

interface ClientProp {
  content: string;
  chat_room_id: number;
  member_id: string;
  type: number;
}

export class SbChatRepository implements ChatRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData?: ClientProp) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async chatRoomFindById(member_id: string) {
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
        chat_member(chat_room_id, member(id,img,name,nickname)),
        member!chat_room_created_member_id_fkey(id,img,name,type,grade,nickname),
        review:review_chat_room_id_fkey(*)
      `,
      )
      .in('id', chatRoomIds)
      .order('created_at', { ascending: false });

    if (chatRoomError) throw new Error(chatRoomError.message);

    return chatRooms;
  }

  async insertChat(): Promise<Chat> {
    const { data: chat, error } = await this.supabase.from('chat').insert(this.clientData).single();

    if (error) throw new Error(error.message);
    return chat;
  }

  async chatFindById(chat_room_id: number): Promise<Chat[]> {
    const { data: chat, error } = await this.supabase.from('chat').select('*').eq('chat_room_id', chat_room_id);

    if (error) throw new Error(error.message);

    return chat;
  }
}
