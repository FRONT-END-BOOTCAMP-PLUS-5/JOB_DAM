import { MemberRepository } from '../../domain/repositories/MemberRepository';

export class UpdateMemberPointUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async update(member_id: string, point: number) {
    await this.repository.updatePointMember(member_id, point);
  }
}
