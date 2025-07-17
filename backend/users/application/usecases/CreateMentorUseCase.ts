import { Mentor } from '@/backend/mentors/domain/entities/Mentor';
import { MentorRepository } from '@/backend/mentors/domain/repositories/MentorRepository';

export class CreateMentorUseCase {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  async create(member_id: string): Promise<{ mentor: string }> {
    const mentor: Mentor = await this.repository.insertMentor(member_id);

    const success = mentor ? 'success' : 'fail';

    return {
      mentor: success,
    };
  }
}
