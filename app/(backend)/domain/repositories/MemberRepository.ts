import { Member } from '../entities/Member';

export interface MemberRepository {
  findTopGradeMembers(): Promise<Member[]>
}
