import { MemberRepository } from '@/app/(backend)/domain/repositories/MemberRepository';
import { MemberDto } from '../../dtos/MemberDTO';
import { MemberTable } from '@/app/(backend)/domain/tables/MemberTable';

export class GetMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ members: MemberDto[] }> {
    const member: MemberTable[] = await this.repository.findAll();

    // Fix: Map to MemberDTO, not MemberData, and include all required properties
    const memberDtos: MemberDto[] = member.map((member) => ({
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
