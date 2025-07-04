import { SupabaseClient } from '@supabase/supabase-js';
import { Question } from '../domain/entities/Question';
import { QuestionTable } from '../domain/tables/QuestionTable';
import { QuestionRepository } from '../domain/repositories/QuestionRepository';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * */

interface ClientProp {
    title?: string
    content?: string
    category_id?: number
}


export class SbQuestionRepository implements QuestionRepository {
    private supabase
    private clientData

    constructor(supabase: SupabaseClient, clientData: ClientProp = {}) {
        this.supabase = supabase
        this.clientData = clientData
    }


    // 데이터베이스 데이터를 도메인 엔티티로 변환
    private getEntities(question: QuestionTable): Question {
        return {...question};
    }

    async findAll(): Promise<Question[]> {
        const { data, error } = await this.supabase.from('question').select("*");

        if (error) throw new Error(error.message);
        return data.map((item) => this.getEntities(item)) as Question[];
    }

    async insertQuestion(): Promise<void> {
        const { error } = await this.supabase.from('question').insert([this.clientData])

        if (error) throw new Error(error.message)
    }
}
