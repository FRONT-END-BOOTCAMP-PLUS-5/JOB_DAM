import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';

export class UpdateMemberPasswordUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string) {
    const member = await this.repository.updatePassword(email, password);

    return member;
  }
}
