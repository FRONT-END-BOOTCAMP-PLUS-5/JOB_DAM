import { Question } from '../entities/question/Question';

export interface QuestionRepository {
<<<<<<< HEAD
  findAll(): Promise<Question[]>;
  insertQuestion(): Promise<Question>;
=======
    findAll(title:string, column:string): Promise<Question[]>
    insertQuestion(): Promise<Question>
>>>>>>> b73680bfed3e5d71a536ba112f3ac837ce0d6edd
}
