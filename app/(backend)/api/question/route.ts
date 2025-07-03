import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse, NextRequest } from 'next/server';
import { GetQuestionUseCase } from "@/app/(backend)/application/usecases/GetQuestionUseCase";
import { SbQuestionRepository } from '../../repositories/SbQuestionRepository';
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
    try{
        const supabase: SupabaseClient = await createClient(); // supabse 불러오기
        const questionRepository = new SbQuestionRepository(supabase); // 쿼리로 supabase 데이터 불러오기
        const getQuestionUseCase = new GetQuestionUseCase(questionRepository); // 가져온 데이터 가공
        const questions = await getQuestionUseCase.execute(); // 가공된 데이터 반환

        return NextResponse.json({result: questions, status: 200 });
    }catch(err){
        if(err instanceof Error){
            return NextResponse.json({message: err.message, status: 503});
        }
    }

}


export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        return NextResponse.json(body)
    }catch(err){
        if(err instanceof Error){
            return NextResponse.json({message: err.message, status: 503});
        }
    }

}