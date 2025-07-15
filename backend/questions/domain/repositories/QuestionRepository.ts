import { Question } from '../entities/Question';
import { QuestionAnswer } from '../entities/QuestionAnswer';

interface IProps{
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  memberId: FormDataEntryValue | null;
  img: string[];
}

interface IComment{
  member_id: string // comment 작성자
  question_id: number //현재 상세페이지 id
  content: string
}

export interface QuestionRepository {
  findAll(title: string, column: string): Promise<Question[]>;
  insertQuestion({ title, content, memberId, img }:IProps): Promise<Question>;
  insertStorage(fileName: string, file: File): Promise<string>
  findItem(id: string): Promise<Question[]>
  getAllMessages(id: string): Promise<QuestionAnswer[]>
  sendMessage(commentUser: IComment): Promise<QuestionAnswer>
}
