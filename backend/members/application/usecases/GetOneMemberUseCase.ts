import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';

export class GetOneMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string) {
    const member = await this.repository.findOne(email, password);

    return member;
  }
}
