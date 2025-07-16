import { SupabaseClient } from '@supabase/supabase-js';
import { QRepository } from '../domain/repositories/QRepository';

export class QuestionCountRepository implements QRepository {
    private supabase;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }
    
    async findQuestionNumData(){
        const { data, error: questionNumDataError } = await this.supabase
            .from('question')
            .select('id');
        if (questionNumDataError) throw new Error(questionNumDataError.message);

        const questionIds = data.map((q) => q.id);

        return questionIds;
    }
}