import { Member } from '@/app/(backend)/domain/entities/Member';
import { MemberRepository } from '@/app/(backend)/domain/repositories/MemberRepository';

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
