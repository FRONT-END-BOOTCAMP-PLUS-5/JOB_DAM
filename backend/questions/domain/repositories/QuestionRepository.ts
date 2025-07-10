import { Question } from '../entities/Question';

export interface QuestionRepository {
  findAll(title: string, column: string): Promise<Question[]>;
  insertQuestion(): Promise<Question>;
}
