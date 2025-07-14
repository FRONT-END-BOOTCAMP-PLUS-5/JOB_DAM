import { Question } from '../entities/Question';

interface IProps{
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  memberId: FormDataEntryValue | null;
  img: string[];
}

export interface QuestionRepository {
  findAll(title: string, column: string): Promise<Question[]>;
  insertQuestion({ title, content, memberId, img }:IProps): Promise<Question>;
  insertStorage(fileName: string, file: File): Promise<string>
  findItem(id: string): Promise<Question[]>
}
