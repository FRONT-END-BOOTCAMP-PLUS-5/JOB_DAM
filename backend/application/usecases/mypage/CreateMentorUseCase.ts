import { Mentor } from '@/backend/domain/entities/Mentor';
import { MentorRepository } from '@/backend/domain/repositories/MentorRepository';

export class CreateMentorUseCase {
  private repository: MentorRepository;

  constructor(repository: MentorRepository) {
    this.repository = repository;
  }

  async create(): Promise<{ mentor: string }> {
    const mentor: Mentor = await this.repository.insertMentor();

    const success = mentor ? 'success' : 'fail';

    return {
      mentor: success,
    };
  }
}
