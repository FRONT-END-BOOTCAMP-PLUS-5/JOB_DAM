import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { GetCategoryListUsecase } from '../../application/usecases/category/GetCategoryListUsecase';
import { SbCategoryRepository } from '../../repositories/SbCategoryRepository';
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
  const supabase: SupabaseClient = await createClient(); // supabse 불러오기
  const categoryRepository = new SbCategoryRepository(supabase); // 쿼리로 supabase 데이터 불러오기
  const getCategoryUsecase = new GetCategoryListUsecase(categoryRepository); // 가져온 데이터 가공
  const categories = await getCategoryUsecase.execute(); // 가공된 데이터 반환

  return NextResponse.json(categories);
}
