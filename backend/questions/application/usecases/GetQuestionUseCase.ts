import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { QuestionTable } from '../../domain/table/QuestionTable';
import { QuestionDto } from '../dtos/QuestionDto';
import { AnswerTable } from '@/backend/questions/domain/table/AnswerTable';
import {QuestionLikedQuestionJoinTable} from "@/backend/questions/domain/table/QuestionLikedQuestionJoinTable";
/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * 수정일: 2025-07-08
 * */

export class GetQuestionUseCase {
  private repository: QuestionRepository;

  constructor(repository: QuestionRepository) {
    this.repository = repository;
  }

  async execute(popular: string | null, latest: string | null, q: string): Promise<{ question: QuestionDto[] }> {
    const column = popular || latest || ''

    const questions: QuestionTable[] = await this.repository.findAll(q, column);

    const questionDtos: QuestionDto[] = questions.map((item) => ({
      id: item['id'],
      title: item['title'],
      content: item['content'],
      createdAt: item['created_at'],
      categoryId: item['category_id'],
      updatedAt: item['updated_at'],
      deletedAt: item['deleted_at'],
      likeNum: item['like_num'],
      dislikeNum: item['dislike_num'],
      view: item['view'],
      member: item['member_id'],
    }));

    return {
      question: questionDtos,
    };
  }

  async getItem(id: string){
    const questionItem: QuestionTable[] = await this.repository.findItem(id)

    const questionDto =  questionItem.map((item) => ({
          id: item['id'],
          title: item['title'],
          content: item['content'],
          createdAt: item['created_at'],
          categoryId: item['category_id'],
          likeNum: item['like_num'],
          dislikeNum: item['dislike_num'],
          view: item['view'],
          img1: item['img1'],
          img2: item['img2'],
          img3: item['img3'],
          member: item['member_id'],
    }))
    return {
      questionItem: questionDto
    }
  }

  async getAllMessages(id: string){
    const answers: AnswerTable[]  = await this.repository.getAllMessages(id)

    const answerDto = answers.map((item) => ({
      id: item['id'],
      memberId: item['member_id'],
      questionId: item['question_id'],
      content: item['content'],
      createdAt: item['created_at'],
      deletedAt: item['deleted_at'],
      updatedAt: item['updated_at'],
    }))


    return {
      answer: answerDto
    }
  }

  async getAllLikeDisLike(id: string){
    const board:QuestionLikedQuestionJoinTable[]  = await this.repository.getLikeDisLike(id)
    const likeDislikeDto = board.map((item) => ({
          id: item['id'],
          title: item['title'],
          content: item['content'],
          likeNum: item['like_num'],
          disLikeNum: item['dislike_num'],
          likedQuestion: {
            memberId: item['liked_question'].length ? item['liked_question'][0]['member_id'] : '',
            questionId: item['liked_question'].length ? item['liked_question'][0]['question_id'] : '',
            likeType: item['liked_question'].length ? item['liked_question'][0]['like_type'] : ''
          }
    }))

    return {
      ...likeDislikeDto
    }
  }
}
