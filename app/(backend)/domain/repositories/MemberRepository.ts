import { Member } from '../entities/Member';

export interface MemberRepository {
  insertMember(): Promise<Member>;
}
