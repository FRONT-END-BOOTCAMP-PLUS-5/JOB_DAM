import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';
import { SbQuestionRepository } from '@/backend/questions/repositories/SbQuestionRepository';
import { CreateQuestionUseCase } from '@/backend/questions/application/usecases/CreateQuestionUseCase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const createQuestionUseCase = new CreateQuestionUseCase(questionRepository)
    const questionView = await createQuestionUseCase.updateViewNum(formData);
    return NextResponse.json({ result: questionView, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}