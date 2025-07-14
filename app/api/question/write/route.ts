import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';

import { createClient } from '@/app/utils/supabase/server';
import { CreateQuestionUseCase } from '@/backend/questions/application/usecases/CreateQuestionUseCase';
import { SbQuestionRepository } from '@/backend/questions/repositories/SbQuestionRepository';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const questions = await new CreateQuestionUseCase(questionRepository).create(formData);
    return NextResponse.json({ result: {...questions}, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}
