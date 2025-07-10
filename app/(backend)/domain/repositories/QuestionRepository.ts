import { Question } from '../entities/question/Question';

export interface QuestionRepository {
    findAll(title:string, column:string): Promise<Question[]>
    insertQuestion(): Promise<Question>
}
