import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

import { createClient } from '@/app/utils/supabase/server';
import { CreateQuestionUseCase } from '@/backend/application/usecases/question/CreateQuestionUseCase';
import { SbQuestionRepository } from '@/backend/repositories/SbQuestionRepository';
import { GetQuestionUseCase } from '@/backend/application/usecases/question/GetQuestionUseCase';

export async function GET(request: NextRequest) {
  try {
    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const getQuestionUseCase = new GetQuestionUseCase(questionRepository); // 가져온 데이터 가공
    const questions = await getQuestionUseCase.execute(request); // 가공된 데이터 반환
    return NextResponse.json({ result: { ...questions }, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase, body);
    const questions = new CreateQuestionUseCase(questionRepository).create();
    return NextResponse.json({ result: questions, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}
