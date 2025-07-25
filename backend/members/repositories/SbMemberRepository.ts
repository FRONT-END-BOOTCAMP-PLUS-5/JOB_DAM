import { SupabaseClient } from '@supabase/supabase-js';
import { Member, User } from '../domain/entities/Member';
import { MemberRepository } from '../domain/repositories/MemberRepository';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { MemberMentorRank } from '@/backend/members/domain/entities/MemberMentorRank';
import { MemberMentorApplicationJoinTable } from '@/backend/members/domain/table/MemberMentorApplicationJoinTable';
import { MemberMentor } from '../domain/entities/MemberMentor';

export class SbMemberRepository implements MemberRepository {
  private supabase;
  private clientData?: sign_up_form_type;

  constructor(supabase: SupabaseClient, clientData?: sign_up_form_type) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  // 엔티티 타입인자 제네릭 추가, 예시 getEntities<MemberTable>, MemberMentorApplicationJoinTable... 등
  // T는 table,  K는 엔티티
  // board에서도 사용하기 때문에 이와 같이수정함
  private getEntities<T, K extends T>(member: T): K {
    return { ...member } as K;
  }

  // not null 기능으로 포인트가 상위 5명만 가져오기
  async findTopGradeMembers(): Promise<MemberMentorRank[]> {
    const { data, error } = await this.supabase
      .from('member')
      .select('id, name, img, point, nickname, mentor_application!inner (company,level)')
      .order('point', { ascending: false })
      .limit(5);

    if (error) throw new Error(error.message);
    return data.map((item) =>
      this.getEntities<MemberMentorApplicationJoinTable, MemberMentorRank>(item),
    ) as MemberMentorRank[];
  }

  async insertMember(): Promise<Member> {
    // 🔹 파라미터 제거, 타입 수정
    const { data, error } = await this.supabase.from('member').insert([this.clientData]).select().single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('데이터 삽입 실패: 반환된 데이터가 없습니다');
    }

    return data;
  }

  async findOneMember(id: string){
    const { data, error } = await this.supabase
      .from('member')
      .select('id, img, nickname, name')
      .eq('id',id)
      .single();


    if (error) throw new Error(error.message);
    return data;

  }

  async findAll(): Promise<Member[]> {
    const { data, error } = await this.supabase.from('member').select('*');

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(email: string, password: string): Promise<Member> {
    const { data, error } = await this.supabase.from('member').select('*').eq('email', email).eq('password', password);

    if (error) throw new Error(error.message);

    return data[0];
  }

  async findById(userId: string): Promise<Member> {
    const { data, error } = await this.supabase.from('member').select('*').eq('id', userId).single();

    if (error) {
      throw new Error('이미 존재하는 회원입니다!');
    }

    return data;
  }

  async findByEmail(email: string): Promise<Member | null> {
    const { data, error } = await this.supabase.from('member').select('*').eq('email', email).single();

    if (error) {
      // 데이터가 없을 때는 null 반환 (에러가 아님)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  }

  async findAllMentor(): Promise<MemberMentor[]> {
    const { data, error } = await this.supabase
      .from('member')
      .select(
        `
      id,name,email,img,nickname,grade, point, type,
      mentor_application(level, company),
      review(rating)
      `,
      )
      .eq('type', 1);

    if (error) throw new Error(error.message);

    return data;
  }

  async updatePassword(email: string, password: string): Promise<Member> {
    const { data, error } = await this.supabase
      .from('member')
      .update({ password: password })
      .eq('email', email)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  }

  async updatePointMember(member_id: string, point: number) {
    const { error } = await this.supabase.rpc('add_point', { member_id: member_id, add_value: point });

    if (error) throw new Error(error.message);
  }
}
