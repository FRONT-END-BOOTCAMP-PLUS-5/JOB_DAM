import { SupabaseClient } from '@supabase/supabase-js';
import { ChatRoomRepository } from '../domain/repositories/ChatRoomRepositorys';
import { ChatRoom } from '../domain/entities/ChatRoom';

interface ClientProp {
  title?: string;
  description?: string;
  max_people?: number;
  member_id: string;
  created_member_id: string;
}

export class SbChatRoomRepository implements ChatRoomRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData: ClientProp) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertChatRoom(): Promise<ChatRoom> {
    const { title, description, max_people, member_id, created_member_id } = this.clientData;

    const { data, error } = await this.supabase
      .from('chat_room')
      .insert([{ title, description, max_people, created_member_id }])
      .select('*')
      .single();

    await this.supabase
      .from('chat_member')
      .insert([
        { member_id: created_member_id, chat_room_id: data.id },
        { member_id, chat_room_id: data.id },
      ])
      .select('*');

    if (error) throw new Error(error.message);

    return data as ChatRoom;
  }
}
