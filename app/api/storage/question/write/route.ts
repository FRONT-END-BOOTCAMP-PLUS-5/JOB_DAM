import { NextRequest, NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/app/utils/supabase/server';
import { SbStorageRepository } from '@/backend/storages/repositories/SbStorageRepository';

export async function POST(request: NextRequest) {
  try {
    const supabase: SupabaseClient = await createClient();

    const formData = await request.formData()
    const file = formData.get("file") as File


    const storageRepository = new SbStorageRepository(supabase);
    const result = await storageRepository.writeImageUpload(file)

    return NextResponse.json({ result, status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message, status: 503 });
    }
  }
}
