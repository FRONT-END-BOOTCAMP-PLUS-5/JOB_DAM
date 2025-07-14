import { SupabaseClient } from '@supabase/supabase-js';
import { Question } from '../domain/entities/Question';
import { QuestionTable } from '../domain/table/QuestionTable';
import { QuestionRepository } from '../domain/repositories/QuestionRepository';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * */



interface IProps{
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
  memberId: FormDataEntryValue | null;
  img: string[];
}

export class SbQuestionRepository implements QuestionRepository {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  // 데이터베이스 데이터를 도메인 엔티티로 변환
  private getEntities(question: QuestionTable): Question {
    return { ...question };
  }

  // 검색기능, 버튼 필터링 생각해서 member 테이블 join
  async findAll(title: string, column: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from('question')
      .select(
        `id,
                                                   title,
                                                   content,
                                                   created_at,
                                                   deleted_at,
                                                   updated_at,
                                                   category_id,
                                                   recommend,
                                                   view,
                                                   member_id(
                                                        id,
                                                        name,
                                                        img,
                                                        nickname
                                                     )
                                                   `,
      )
      .like('title', `%${title}%`)
      .order(`${column}`, { ascending: false });

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
        .eq('id',`${id}`)

    if (error) throw new Error(error.message);
    return data as Question[];
  }
}
