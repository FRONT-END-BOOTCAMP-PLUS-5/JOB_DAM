import { MemberRepository } from '@/backend/domain/repositories/MemberRepository';
import { MemberDTO } from '../../dtos/MemberDto';
import { MemberTable } from '@/backend/domain/tables/MemberTable';

interface MemberData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  img: string;
  nickname: string;
}

export class GetOneMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string) {
    const member: MemberTable = await this.repository.findOne(email, password);

    // Fix: Map to MemberDTO, not MemberData, and include all required properties
    const memberDTOs: MemberData = {
      id: member.id,
      name: member.name,
      email: member.email,
      password: member.password,
      createdAt: member.created_at,
      img: member.img,
      nickname: member.nickname,
    };

    return {
      members: memberDTOs,
    };
  }
}
