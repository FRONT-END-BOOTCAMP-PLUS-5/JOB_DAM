import { Question, QuestionLikeDisLike } from '../entities/Question';
import { QuestionAnswer } from '../entities/QuestionAnswer';
import { QuestionLikedQuestion } from '../entities/QuestionLikedQuestion';
import {LikedQuestion} from "../entities/LikedQuestion";

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

interface IQuestionLikeDisLike{
  question_id: number,
  like_num: number,
  dislike_num: number,
  check: boolean
}

interface ILikedQuestion{
  member_id: string,
  question_id: number,
  like_type: boolean,
}

export interface QuestionRepository {
  findAll(title: string, column: string): Promise<Question[]>;
  insertQuestion({ title, content, memberId, img }:IProps): Promise<Question>;
  insertStorage(fileName: string, file: File): Promise<string>
  findItem(id: string): Promise<Question[]>
  getAllMessages(id: string): Promise<QuestionAnswer[]>
  sendMessage(commentUser: IComment): Promise<QuestionAnswer>
  getLikeDisLike(id: string): Promise<QuestionLikedQuestion[]>
  insertLikedQuestion({ member_id, question_id, like_type}:ILikedQuestion): Promise<LikedQuestion>
  updateQuestionLikeDisLike({question_id, like_num, dislike_num, check}: IQuestionLikeDisLike):Promise<QuestionLikeDisLike>
}
