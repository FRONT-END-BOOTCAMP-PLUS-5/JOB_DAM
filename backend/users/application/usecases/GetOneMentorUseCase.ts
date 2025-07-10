import { MentorRepository } from '@/backend/mentors/domain/repositories/MentorRepository';
import { MentorDto } from '../../../mentors/application/dtos/MentorDto';
import { MentorTable } from '@/backend/mentors/domain/table/MentorTable';

export class GetOneMentorUseCase {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  async execute(memberId: string): Promise<{ mentor: MentorDto }> {
    const mentor: MentorTable = await this.repository.findOne(memberId);

    const mentorDtos: MentorDto = {
      memberId: mentor.member_id,
      company: mentor.company,
      level: mentor.level,
      workPeriod: mentor.work_period,
      createdAt: mentor.created_at,
      deletedAt: mentor.deleted_at,
      updatedAt: mentor.updated_at,
    };

    return {
      mentor: mentorDtos,
    };
  }
}
