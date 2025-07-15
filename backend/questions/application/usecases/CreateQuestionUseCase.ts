import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { Question } from '../../domain/entities/Question';
import { AnswerTable } from '@/backend/questions/domain/table/AnswerTable';
import { QuestionAnswer } from '@/backend/questions/domain/entities/QuestionAnswer';
import { QuestionAnswerDto } from '@/backend/questions/application/dtos/QuestionAnswerDto';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */
interface IComment{
  member_id: string // comment 작성자
  question_id: number //현재 상세페이지 id
  title: string
  content: string
}
export class CreateQuestionUseCase {
  private repository: QuestionRepository;

  constructor(repository: QuestionRepository) {
    this.repository = repository;
  }

  async postStorage(formData: FormData):Promise<string[]>{
    const img:string[]= []

    for(let i=0; i<3; i++){
      const file = formData.get(`file${i+1}`) as File || ''

      if(file.name){
        //타임 스탬프
        const timestamp = Date.now();
        //확장자 가져오기
        const regex = /\.[a-zA-Z0-9]+$/
        //uuid 생성
        const uuid = crypto.randomUUID()
        const fileExtension = file.name.match(regex)

        const fileName = `${timestamp}_${uuid}${fileExtension}`
        img.push(fileName)
        await this.repository.insertStorage(fileName, file)
      }
    }

    return img
  }

  async create(formData: FormData): Promise<{ question: Question }> {
    const title = formData.get("title")
    const content = formData.get("content")
    const memberId = formData.get("memberId")

    const img = await this.postStorage(formData)

    const param = {
      title,
      content,
      memberId,
      img,
    }
    const question: Question = await this.repository.insertQuestion(param);


    return {
      question,
    };
  }

  async sendMessage(formData: FormData):Promise<QuestionAnswerDto>{
    const content = formData.get("content")  as string
    const member_id = formData.get("memberId") as string
    const question_id= parseInt(formData.get("question_id") as string)

    const commentUser = {
      content,
      member_id,
      question_id
    }

    const answer:AnswerTable = await this.repository.sendMessage(commentUser)

    const answerDto = {
      id: answer['id'],
      memberId: answer['member_id'],
      questionId: answer['question_id'],
      content: answer['content'],
      createdAt: answer['created_at'],
      deletedAt: answer['deleted_at'],
      updatedAt: answer['updated_at']
    }

    return answerDto
  }

}
