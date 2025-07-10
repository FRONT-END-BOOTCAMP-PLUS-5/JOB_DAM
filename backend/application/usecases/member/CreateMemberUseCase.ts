import { Member } from '@/backend/domain/entities/Member';
import { MemberRepository } from '@/backend/domain/repositories/MemberRepository';

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
