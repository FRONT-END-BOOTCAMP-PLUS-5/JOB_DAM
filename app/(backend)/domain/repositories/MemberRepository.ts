import { Member } from '../entities/Member';

export interface MemberRepository {
<<<<<<< HEAD
  insertMember(): Promise<Member>;
  findAll(): Promise<Member[]>;
  findOne(email: string, password: string): Promise<Member>;
=======
  findTopGradeMembers(): Promise<Member[]>
>>>>>>> b73680bfed3e5d71a536ba112f3ac837ce0d6edd
}
