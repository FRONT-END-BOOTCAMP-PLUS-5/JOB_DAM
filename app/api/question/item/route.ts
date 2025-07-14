import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

import { createClient } from '@/app/utils/supabase/server';
import { SbQuestionRepository } from '@/backend/questions/repositories/SbQuestionRepository';
import { GetQuestionUseCase } from '@/backend/questions/application/usecases/GetQuestionUseCase';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const supabase: SupabaseClient = await createClient();
        const questionRepository = new SbQuestionRepository(supabase);
        const getQuestionUseCase = new GetQuestionUseCase(questionRepository);
        const questionItem = await getQuestionUseCase.getItem(id || '');
        return NextResponse.json({ result: {...questionItem}, status: 200 });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message, status: 500 });
        }
    }
}


