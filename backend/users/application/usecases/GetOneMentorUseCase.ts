import { MentorRepository } from '@/backend/mentors/domain/repositories/MentorRepository';
import { MentorDto } from '../../../mentors/application/dtos/MentorDto';
import { MentorTable } from '@/backend/mentors/domain/table/MentorTable';

export class GetOneMentorUseCase {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  async execute(memberId: string): Promise<{ mentor: MentorDto[] }> {
    const mentor: MentorTable[] = await this.repository.findOne(memberId);

    const mentorDtos: MentorDto[] = mentor?.map((item) => ({
      memberId: item?.member_id,
      company: item?.company,
      level: item?.level,
      workPeriod: item?.work_period,
      createdAt: item?.created_at,
    }));

    return {
      mentor: mentorDtos,
    };
  }
}
