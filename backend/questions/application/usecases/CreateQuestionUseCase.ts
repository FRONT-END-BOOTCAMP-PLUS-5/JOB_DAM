import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { Question } from '../../domain/entities/Question';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */
export class CreateQuestionUseCase {
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
