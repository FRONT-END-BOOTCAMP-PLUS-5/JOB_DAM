import { LoginRepository } from '@/backend/login/domain/respository/LoginRepository';
import { Member } from '@/backend/members/domain/entities/Member';
import { SupabaseClient } from '@supabase/supabase-js';

export class SbLoginRepository implements LoginRepository {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findByEmail(email: string): Promise<Member> {
    const { data, error } = await this.supabase.from('member').select('*').eq('email', email).single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findById(userId: string): Promise<Member> {
    const { data, error } = await this.supabase.from('member').select('*').eq('id', userId).single();

    if (error) throw new Error(error.message);
    return data;
  }
}
