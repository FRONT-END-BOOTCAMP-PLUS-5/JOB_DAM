import { MemberRepository } from '@/backend/members/domain/repositories/MemberRepository';
import { MemberMentor } from '../../domain/entities/MemberMentor';
import { MemberMentorDto } from '../dtos/MemberMentor';

export class GetMentorListUseCase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ members: MemberMentorDto[] }> {
    const members: MemberMentor[] = await this.repository.findAllMentor();

    const memberDtos: MemberMentorDto[] = members.map((member) => ({
      id: member.id,
      email: member.email,
      img: member.img,
      name: member.name,
      nickname: member.nickname,
      grade: member.grade,
      point: member.point ?? 0,
      type: member.type,
      mentorApplication: member.mentor_application,
    }));

    return {
      members: memberDtos,
    };
  }
}
