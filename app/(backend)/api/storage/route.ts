import { createAdminClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SbStorageRepository } from '../../repositories/SbStorageRepository';

export async function POST(request: NextRequest) {
  try {
    // FormData에서 파일 추출
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({
        message: '이미지 파일이 없습니다.',
        status: 400,
      });
    }

    // 파일 유효성 검증
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({
        message: '이미지 파일만 업로드 가능합니다.',
        status: 400,
      });
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({
        message: '파일 크기는 5MB 이하여야 합니다.',
        status: 400,
      });
    }
    const supabase: SupabaseClient = await createAdminClient();
    const storageRepository = new SbStorageRepository(supabase);

    // 파일 업로드 실행
    const imageUrl = await storageRepository.uploadFile(file);

    return NextResponse.json({
      imageUrl,
      status: 200,
      message: '이미지 업로드 성공',
    });
  } catch (err) {
    console.error('스토리지 업로드 에러:', err);
    if (err instanceof Error) {
      return NextResponse.json({
        message: `업로드 실패: ${err.message}`,
        status: 500,
      });
    }
    return NextResponse.json({
      message: '알 수 없는 오류가 발생했습니다.',
      status: 500,
    });
  }
}
