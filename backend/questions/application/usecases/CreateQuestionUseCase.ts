import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import {Question, QuestionLikeDisLike} from '../../domain/entities/Question';
import { QuestionAnswer } from '@/backend/questions/domain/entities/QuestionAnswer';
import { QuestionAnswerDto } from '@/backend/questions/application/dtos/QuestionAnswerDto';
import {LikedQuestionTable} from "@/backend/questions/domain/table/QuestionLikedQuestionJoinTable";
import {QuestionLikedQuestionJoinDto} from "@/backend/questions/application/dtos/QuestionLikedQuestionJoinDto";
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */
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

  async sendMessage(formData: FormData):Promise<null>{
    const content = formData.get("content")  as string
    const member_id = formData.get("memberId") as string
    const question_id= parseInt(formData.get("question_id") as string)

    const commentUser = {
      content,
      member_id,
      question_id
    }

    await this.repository.sendMessage(commentUser)

    return null
  }

  async upsertLikeDisLike(formData: FormData):Promise<QuestionLikedQuestionJoinDto>{
    const member_id = formData.get("memberId") as string
    const question_id = formData.get("questionId") as string
    const like_type = formData.get("check")?.toString() === 'like' ? true : false
    const like_num = formData.get("likeNum") as string
    const dislike_num = formData.get("dislikeNum") as string

    const insertLikedParam = {
      member_id,
      question_id: parseInt(question_id),
      like_type
    }

    const likedQuestion:LikedQuestionTable = await this.repository.insertLikedQuestion(insertLikedParam)

    // 버튼 누르고 나서 boolean 값
    const likeType = likedQuestion.like_type ? true : false

    const updateQuestion = {
      question_id: parseInt(question_id),
      like_num: parseInt(like_num),
      dislike_num: parseInt(dislike_num),
      check: likeType
    }

    const question:QuestionLikeDisLike = await this.repository.updateQuestionLikeDisLike(updateQuestion)

    const questionDto = {
      id: question['id'],
      likeNum: question['like_num'],
      dislikeNum: question['dislike_num']
    }

    return {
      ...questionDto
    }
  }

  async updateViewNum(formData: FormData){
    const view = formData.get('view') as string
    const id = formData.get('question_id') as string

    const param = {
      id: parseInt(id),
      view: parseInt(view)+1
    }

    const QuestionView = await this.repository.setBoardView(param)

    if(QuestionView === null) return 'success'
  }

}
