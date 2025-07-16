import { LoginRepository } from '@/backend/login/domain/respository/LoginRepository';
import { Member } from '@/backend/members/domain/entities/Member';

export class GetLoginUserIdUseCase {
  private repository: LoginRepository;

  constructor(repository: LoginRepository) {
    this.repository = repository;
  }

  async execute(userId: string): Promise<Member> {
    const member = await this.repository.findById(userId);

    return member;
  }
}
