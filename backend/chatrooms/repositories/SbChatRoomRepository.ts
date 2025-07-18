import { SupabaseClient } from '@supabase/supabase-js';
import { ChatRoomRepository } from '../domain/repositories/ChatRoomRepositorys';
import { ChatRoom } from '../domain/entities/ChatRoom';
import { AlarmChatRoom } from '../domain/entities/AlarmChatRoom';

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

  constructor(supabase: SupabaseClient, clientData?: ClientProp) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertChatRoom(): Promise<ChatRoom> {
    const { title, description, max_people, member_id, created_member_id } = this.clientData ?? {};

    // const { data, error } = await this.supabase
    //   .from('chat_room')
    //   .insert([{ title, description, max_people, created_member_id }])
    //   .select('*')
    //   .single();

    // await this.supabase
    //   .from('chat_member')
    //   .insert([
    //     { member_id: created_member_id, chat_room_id: data.id },
    //     { member_id, chat_room_id: data.id },
    //   ])
    //   .select('*');

    // await this.supabase
    //   .from('alarm_chat_room')
    //   .insert({ send_member_id: member_id, response_member_id: created_member_id })
    //   .select('*');

    const { data, error } = await this.supabase.rpc('create_chat_room_with_members', {
      p_title: title,
      p_description: description,
      p_max_people: max_people,
      p_created_member_id: created_member_id,
      p_member_id: member_id,
    });

    if (error) throw new Error(error.message);

    return data;
  }

  async updateChatRoom(chat_room_id: number, progress: number) {
    const { error } = await this.supabase.from('chat_room').update({ progress: progress }).eq('id', chat_room_id);

    if (error) throw new Error(error.message);
  }

  async findByOneChatRoom(created_member_id: string): Promise<AlarmChatRoom[]> {
    const { data, error } = await this.supabase
      .from('chat_room')
      .select('id, title, created_at')
      .eq('created_member_id', created_member_id)
      .eq('progress', 0);

    if (error) throw new Error(error.message);

    return data;
  }
}
