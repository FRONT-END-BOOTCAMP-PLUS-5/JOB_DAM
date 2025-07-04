import { Question } from '../entities/Question';

export interface QuestionRepository {
    findAll(): Promise<Question[]>
    insertQuestion(): Promise<void>

}
