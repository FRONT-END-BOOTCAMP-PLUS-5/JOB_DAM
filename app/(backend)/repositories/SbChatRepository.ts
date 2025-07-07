import { SupabaseClient } from '@supabase/supabase-js';
import { ChatRepository } from '../domain/repositories/ChatRepository';
import { ChatMember } from '../domain/entities/ChatMember';

const CHAT_MEMBER_TABLE_NAME = 'chat_member';

export class SbChatRepository implements ChatRepository {
  private supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findById(member_id: string): Promise<ChatMember[]> {
    const { data, error } = await this.supabase
      .from(CHAT_MEMBER_TABLE_NAME)
      .select()
      .eq('member_id', member_id)
      .single();

    if (error) throw new Error(error.message);

    return data as ChatMember[];
  }
}
