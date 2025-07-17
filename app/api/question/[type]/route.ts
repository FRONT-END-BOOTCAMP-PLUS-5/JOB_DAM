import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

import { createClient } from '@/app/utils/supabase/server';
import { SbQuestionRepository } from '@/backend/questions/repositories/SbQuestionRepository';
import { GetQuestionUseCase } from '@/backend/questions/application/usecases/GetQuestionUseCase';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const popular = searchParams.get('popular');
    const latest = searchParams.get('latest');
    const q = searchParams.get('q') as string;



    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const getQuestionUseCase = new GetQuestionUseCase(questionRepository); // 가져온 데이터 가공
    const questions = await getQuestionUseCase.execute(popular, latest, q); // 가공된 데이터 반환
    return NextResponse.json({ result: { ...questions }, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}


