import { Member } from '@/backend/members/domain/entities/Member';
import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';

export class CreateMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async create(): Promise<{ member: string }> {
    const member: Member = await this.repository.insertMember();

    const success = member ? 'success' : 'fail';

    return {
      member: success,
    };
  }
}
