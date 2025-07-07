import { SupabaseClient } from '@supabase/supabase-js';
import { Member } from '../domain/entities/Member';
import { MemberRepository } from '../domain/repositories/MemberRepository';

interface ClientProp {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at?: string;
  img?: string;
  nickname: string;
  grade?: number;
  point?: number;
  type?: number;
  deleted_at?: string;
}

export class SbMemberRepository implements MemberRepository {
  private supabase;
  private clientData: ClientProp;

  constructor(supabase: SupabaseClient, clientData: ClientProp) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertMember(): Promise<Member> {
    // 🔹 파라미터 제거, 타입 수정
    const { data, error } = await this.supabase.from('member').insert([this.clientData]).select().single();

    if (error) throw new Error(error.message);
    return data;
  }
}
