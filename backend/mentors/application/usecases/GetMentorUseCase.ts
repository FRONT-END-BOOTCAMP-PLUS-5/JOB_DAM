import { MentorRepository } from '@/backend/mentors/domain/repositories/MentorRepository';
import { MentorDto } from '../dtos/MentorDto';
import { MentorTable } from '@/backend/mentors/domain/table/MentorTable';

export class GetMentorUseCase {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ mentor: MentorDto[] }> {
    const mentors: MentorTable[] = await this.repository.findAll();

    const mentorDtos: MentorDto[] = mentors.map((mentor) => ({
      memberId: mentor.member_id,
      company: mentor.company,
      level: mentor.level,
      workPeriod: mentor.work_period,
      createdAt: mentor.created_at,
    }));

    return {
      mentor: mentorDtos,
    };
  }
}
