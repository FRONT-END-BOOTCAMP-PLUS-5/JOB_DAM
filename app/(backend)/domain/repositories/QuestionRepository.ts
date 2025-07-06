import { Question } from '../entities/question/Question';

export interface QuestionRepository {
    findAll(): Promise<Question[]>
    insertQuestion(): Promise<Question>
}
