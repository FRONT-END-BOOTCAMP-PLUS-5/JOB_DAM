import { SupabaseClient } from '@supabase/supabase-js';
import { Question } from '../domain/entities/Question';
import { QuestionTable } from '../domain/table/QuestionTable';
import { QuestionRepository } from '../domain/repositories/QuestionRepository';
import {QuestionLikedQuestion} from "@/backend/questions/domain/entities/QuestionLikedQuestion";
import {LikedQuestion} from "@/backend/questions/domain/entities/LikedQuestion";

/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * */



interface IProps{
  title: FormDataEntryValue | null
  content: FormDataEntryValue | null
  memberId: FormDataEntryValue | null
  img: string[]
}

interface IComment{
  member_id: string // comment 작성자
  question_id: number //현재 상세페이지 id
  content: string
}

interface IQuestionLikeDisLike{
  question_id: number
  like_num: number
  dislike_num: number
  check: boolean
}

interface ILikedQuestion{
  member_id: string
  question_id: number
  like_type: boolean
}

interface IQuestionView{
  id: number
  view: number
}

export class SbQuestionRepository implements QuestionRepository {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  // 데이터베이스 데이터를 도메인 엔티티로 변환, 두개의 타입인자로 표현
  private getEntities<T, K extends T>(question: T): K {
    return { ...question } as K;
  }


  // 검색기능, 버튼 필터링 생각해서 member 테이블 join
  async findAll(title: string, column: string): Promise<Question[]> {
    const supabase = this.supabase
      .from('question')
      .select(
        `id,
         title,
         content,
         created_at,
         deleted_at,
         updated_at,
         category_id,
         like_num,
         dislike_num,
         view,
         member_id(
          id,
          name,
          img,
          nickname
          )
          `)
      .like('title', `%${title}%`)
    const orderSupabase = column === 'created_at' ?
      supabase.order(`${column}`, { ascending: false }) :
      supabase.order(`${column}`, { ascending: false }).order(`view`, { ascending: false })

    const { data, error } = await orderSupabase



    if (error) throw new Error(error.message);
    return data.map((item) => this.getEntities(item)) as Question[];
  }

  async insertStorage(fileName: string, file: File){
    const { data, error } = await this.supabase.storage
      .from("board-upload-image")
      .upload(fileName, file, { upsert: true })
    if (error) throw new Error(error.message);
    return data.path;
  }


  async insertQuestion({ title, content, memberId, img }:IProps): Promise<Question> {
    const { data, error } = await this.supabase.from('question').insert({
      title,
      content,
      member_id: memberId,
      img1: img && img[0],
      img2: img && img[1],
      img3: img && img[2]
    }).select('*').single();


    if (error) throw new Error(error.message);
    return data as Question;
  }

  async findItem(id: string):Promise<Question[]>{
    const { data, error } = await this.supabase
        .from("question")
        .select('*, member_id(id,name,img,nickname)')
        .eq('id',id)

    if (error) throw new Error(error.message);
    return data as Question[];
  }

  async getAllMessages(id: string){
    const {data, error} = await this.supabase
      .from("answer")
      .select("id, content, created_at, member_id(id, name, nickname, img)")
      .eq('question_id', id)

    if (error) throw new Error(error.message);
    return data;
  }

  async sendMessage(commentUser: IComment){
    const member_id = commentUser['member_id'] as string
    const question_id = commentUser['question_id'] as number
    const content = commentUser['content'] as string
    const {data, error} = await this.supabase
      .from("answer")
      .insert({
        member_id,
        question_id,
        content
      })

    if (error) throw new Error(error.message);
    return data;
  }

  async getLikeDisLike(id: string):Promise<QuestionLikedQuestion[]>{
    const {data, error} = await this.supabase
        .from('question')
        .select(`id,
                title,
                content,
                like_num,
                dislike_num,
                liked_question(member_id, question_id, like_type)`)
        .eq('id', id)

    if (error) throw new Error(error.message);
    return data;
  }

  async insertLikedQuestion({ member_id, question_id, like_type}:ILikedQuestion):Promise<LikedQuestion>{
    const {data, error} = await this.supabase
        .from("liked_question")
        .insert([{
          member_id,
          question_id,
          like_type
        }])
        .select(`member_id, question_id, like_type`)
        .single()

    if (error) throw new Error(error.message);
    return data;
  }

  async updateQuestionLikeDisLike({question_id, like_num, dislike_num, check}: IQuestionLikeDisLike){
    const supabase = this.supabase.from('question')

    const supabase_update = check ? supabase.update({like_num: check ? like_num+1 : like_num}) : supabase.update({dislike_num: check ? dislike_num : dislike_num+1})
    const {data, error} = await supabase_update
        .eq('id', question_id)
        .select(`id, like_num, dislike_num`)
        .single()


    if (error) throw new Error(error.message);
    return data;
  }

  async setBoardView({id, view}: IQuestionView){
    const {data, error} = await this.supabase
      .from('question')
      .update({view})
      .eq('id',id)

    if (error) throw new Error(error.message);
    return data;
  }









}
