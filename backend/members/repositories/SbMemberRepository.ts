import { SupabaseClient } from '@supabase/supabase-js';
import { Member } from '../domain/entities/Member';
import { MemberRepository } from '../domain/repositories/MemberRepository';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { MemberTable } from '../domain/table/MemberTable';

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
    return data.map((item) => this.getEntities(item)) as Member[];
  }

  async insertMember(): Promise<Member> {
    // 🔹 파라미터 제거, 타입 수정

    const { data, error } = await this.supabase.from('member').insert([this.clientData]).select().single();

    if (error) {
      console.error('🚨 === Supabase Insert 에러 상세 ===');
      console.error('에러 코드:', error.code);
      console.error('에러 메시지:', error.message);
      console.error('에러 세부사항:', error.details);
      console.error('에러 힌트:', error.hint);
      throw new Error(error.message);
    }

    if (!data) {
      console.error('🚨 데이터가 null입니다! 하지만 에러는 없음');
      throw new Error('데이터 삽입 실패: 반환된 데이터가 없습니다');
    }

    return data;
  }

  async findAll(): Promise<Member[]> {
    const { data, error } = await this.supabase.from('member').select('*');

    if (error) throw new Error(error.message);
    return data as Member[];
  }

  async findOne(email: string, password: string): Promise<Member> {
    const { data } = await this.supabase
      .from('member')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (!data?.email) {
      throw new Error('이메일이 일치하지 않습니다.');
    }

    if (!data?.password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    return data as Member;
  }

  async findById(userId: string): Promise<Member> {
    const { data } = await this.supabase.from('member').select('*').eq('userId', userId).single();

    return data as Member;
  }
}
