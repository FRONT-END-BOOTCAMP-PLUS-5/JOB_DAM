import { SupabaseClient } from '@supabase/supabase-js';
import { Member } from '@/backend/signups/domain/entities/Member';
import { MemberRepository } from '@/backend/signups/domain/repositories/MemberRepository';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { MemberTable } from '@/backend/signups/domain/table/MemberTable';

export class SbMemberRepository implements MemberRepository {
  private supabase;
  private clientData?: sign_up_form_type;

  constructor(supabase: SupabaseClient, clientData?: sign_up_form_type) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  private getEntities(member: MemberTable): Member {
    return { ...member };
  }

  // not null 기능으로 포인트가 상위 5명만 가져오기
  async findTopGradeMembers(): Promise<Member[]> {
    const { data, error } = await this.supabase
      .from('member')
      .select(`*`)
      .order('grade', { ascending: false })
      .limit(5);

    if (error) throw new Error(error.message);
    return data.map((item) => this.getEntities(item));
  }

  async insertMember(): Promise<Member> {
    const { data, error } = await this.supabase.from('member').insert([this.clientData]).select().single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('데이터 삽입 실패: 반환된 데이터가 없습니다');
    }

    return data;
  }

  async findAll(): Promise<Member[]> {
    const { data, error } = await this.supabase.from('member').select('*');

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(email: string, password: string): Promise<Member> {
    const { data, error } = await this.supabase
      .from('member')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    return data;
  }
}
