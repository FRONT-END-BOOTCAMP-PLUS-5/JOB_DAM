import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';
import { SbQuestionRepository } from '@/backend/questions/repositories/SbQuestionRepository';
import { GetQuestionUseCase } from '@/backend/questions/application/usecases/GetQuestionUseCase';
import { CreateQuestionUseCase } from '@/backend/questions/application/usecases/CreateQuestionUseCase';

export async function GET(request: NextRequest) {
  try{
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('item');

    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const getQuestionAnswerUseCase = new GetQuestionUseCase(questionRepository); // 가져온 데이터 가공
    const answers = await getQuestionAnswerUseCase.getAllMessages(id || ''); // 가공된 데이터 반환
    return NextResponse.json({result: {...answers}, status: 200 });
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({message: err.message, status: 500});
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const supabase: SupabaseClient = await createClient();
    const questionRepository = new SbQuestionRepository(supabase);
    const getQuestionAnswerUseCase = new CreateQuestionUseCase(questionRepository)
    const answers = await getQuestionAnswerUseCase.sendMessage(formData);
    return NextResponse.json({ result: {...answers}, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}