import { Member } from '../entities/Member';
import { MemberMentorRank } from '@/backend/members/domain/entities/MemberMentorRank';

export interface MemberRepository {
  insertMember(): Promise<Member>;
  findAll(): Promise<Member[]>;
  findOne(email: string, password: string): Promise<Member>;
  findTopGradeMembers(): Promise<MemberMentorRank[]>;
  findById(userId: string): Promise<Member>;
  findByEmail(email: string): Promise<Member | null>;
  findAllMentor(): Promise<Member[]>;
  updatePassword(email: string, password: string): Promise<Member>;
}
