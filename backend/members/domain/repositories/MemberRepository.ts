import { Member } from '../entities/Member';

export interface MemberRepository {
  insertMember(): Promise<Member>;
  findAll(): Promise<Member[]>;
  findOne(email: string, password: string): Promise<Member>;
  findTopGradeMembers(): Promise<Member[]>;
}
