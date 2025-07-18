import { Member } from '../entities/Member';
import { MemberMentorRank } from '@/backend/members/domain/entities/MemberMentorRank';
import { MemberMentor } from '../entities/MemberMentor';

export interface MemberRepository {
  insertMember(): Promise<Member>;
  findAll(): Promise<Member[]>;
  findOne(email: string, password: string): Promise<Member>;
  findTopGradeMembers(): Promise<MemberMentorRank[]>;
  findById(userId: string): Promise<Member>;
  findByEmail(email: string): Promise<Member | null>;
  findAllMentor(): Promise<MemberMentor[]>;
  updatePassword(email: string, password: string): Promise<Member>;
  updatePointMember(member_id: string, point: number): void;
}
