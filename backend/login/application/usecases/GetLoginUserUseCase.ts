import { LoginRepository } from '@/backend/login/domain/respository/LoginRepository';
import { Member } from '@/backend/members/domain/entities/Member';

export class GetLoginUserUseCase {
  private repository: LoginRepository;

  constructor(repository: LoginRepository) {
    this.repository = repository;
  }

  async execute(email: string): Promise<Member> {
    const member = await this.repository.findByEmail(email);

    return member;
  }
}
