import { QuestionRepository } from '../../../domain/repositories/QuestionRepository';
import { Question } from '../../../domain/entities/Question';

export class CreateMentorUseCase {
  private repository: QuestionRepository;

  constructor(repository: QuestionRepository) {
    this.repository = repository;
  }

  async create(): Promise<{ question: string }> {
    const question: Question = await this.repository.insertQuestion();

    const success = question ? 'success' : 'fail';

    return {
      question: success,
    };
  }
}
