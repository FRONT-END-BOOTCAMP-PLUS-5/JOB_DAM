import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';
import { MemberDTO } from '../dtos/MemberDto';
import { MemberTable } from '@/backend/members/domain/table/MemberTable';

interface MemberData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  img: string;
  nickname: string;
}

export class GetMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ members: MemberDTO[] }> {
    const member: MemberTable[] = await this.repository.findAll();

    // Fix: Map to MemberDTO, not MemberData, and include all required properties
    const memberDTOs: MemberDTO[] = member.map((member) => ({
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
    }));

    return {
      members: memberDTOs,
    };
  }
}
