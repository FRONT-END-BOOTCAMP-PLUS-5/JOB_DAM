import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { QuestionCountRepository } from '@/backend/questions/repositories/QuestionCountRepository';
import { GetQuestionCountUseCase } from '@/backend/questions/application/usecases/GetQuestionCountUseCase';

export async function GET() {
    
    const supabase: SupabaseClient = await createClient();
    const questionCRepository = new QuestionCountRepository(supabase);
    const getQCount = new GetQuestionCountUseCase(questionCRepository);
    const memberCount = await getQCount.execute();
    
    return NextResponse.json(memberCount);
}