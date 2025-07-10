import { MemberRepository } from '@/backend/domain/repositories/MemberRepository';
import { MemberDto } from '../../dtos/MemberDto';
import { Member } from '@/backend/domain/entities/Member';

export class GetMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ members: MemberDto[] }> {
    const members: Member[] = await this.repository.findAll();

    // Fix: Map to MemberDto, not MemberData, and include all required properties
    const memberDtos: MemberDto[] = members.map((member) => ({
      id: member.id,
      name: member.name,
      email: member.email,
      createdAt: member.created_at,
      img: member.img,
      nickname: member.nickname,
      password: member.password,
      updatedAt: member.updated_at,
      grade: member.grade,
      point: member.point,
      type: member.type,
      deletedAt: member.deleted_at,
    }));

    return {
      members: memberDtos,
    };
  }
}
