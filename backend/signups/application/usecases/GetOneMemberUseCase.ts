import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';
import {Member} from "@/backend/members/domain/entities/Member";

interface MemberData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  img: string | null;
  nickname: string ;
}

export class GetOneMemberUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(email: string, password: string) {
    const member: Member = await this.repository.findOne(email, password);

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
