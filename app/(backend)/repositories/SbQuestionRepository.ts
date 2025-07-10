import { SupabaseClient } from '@supabase/supabase-js';
import { Question } from '../domain/entities/question/Question';
import { QuestionTable } from '../domain/tables/QuestionTable';
import { QuestionRepository } from '../domain/repositories/QuestionRepository';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * */

interface ClientProp {
  title?: string;
  content?: string;
  category_id?: number;
  url?: string;
}

export class SbQuestionRepository implements QuestionRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData: ClientProp = {}) {
    this.supabase = supabase;
    this.clientData = clientData;
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

  async insertQuestion(): Promise<Question> {
    const { data, error } = await this.supabase.from('question').insert([this.clientData]).select('*').single();

    if (error) throw new Error(error.message);
    return data as Question;
  }
}
