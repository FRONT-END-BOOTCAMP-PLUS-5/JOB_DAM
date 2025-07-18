import { Member } from '@/backend/members/domain/entities/Member';

export interface LoginRepository {
  findByEmail(email: string): Promise<Member>;
  findById(userId: string): Promise<Member>;
}
