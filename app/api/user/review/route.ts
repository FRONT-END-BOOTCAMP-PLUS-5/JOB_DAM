import { createClient } from '@/app/utils/supabase/server';
import { CreateReviewUseCase } from '@/backend/reviews/application/usecases/CreateReviewUseCase';
import { SbReviewRepository } from '@/backend/reviews/repositories/SbReviewRepository';
import { GetReviewUseCase } from '@/backend/users/application/usecases/GetReviewUseCase';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url: URL = new URL(request.url);
  const param: string = url.searchParams.get('id') || '1';

  try {
    const supabase: SupabaseClient = await createClient();
    const reviewRepository = new SbReviewRepository(supabase);
    const review = await new GetReviewUseCase(reviewRepository).execute(param);

    return NextResponse.json(review);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 503 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabase: SupabaseClient = await createClient();
    const reviewRepository = new SbReviewRepository(supabase, body);
    const review = new CreateReviewUseCase(reviewRepository).create(body.chat_room_id);

    return NextResponse.json({ result: review, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}
