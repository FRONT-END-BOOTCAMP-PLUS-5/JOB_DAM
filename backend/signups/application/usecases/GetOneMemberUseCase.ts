import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';
import { Member } from '@/backend/members/domain/entities/Member';

interface MemberData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  img: string | null;
  nickname: string;
  grade: number;
  point: number | null;
  type: number | null;
  deletedAt: string | null;
}

export class GetOneMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string) {
    const member: Member = await this.repository.findOne(email, password);

    // Fix: Map to MemberDto, not MemberData, and include all required properties
    const memberDto: MemberData = {
      id: member.id,
      name: member.name,
      email: member.email,
      password: member.password,
      createdAt: member.created_at,
      img: member.img,
      nickname: member.nickname,
      grade: member.grade,
      point: member.point ?? 0,
      type: member.type,
      deletedAt: member.deleted_at,
    };

    return {
      members: memberDto,
    };
  }
}
