import { SupabaseClient } from '@supabase/supabase-js';
import { StorageRepository } from '../domain/repositories/StorageRepository';



export class SbStorageRepository implements StorageRepository {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async uploadFile(file: File): Promise<string> {
    // 파일명 중복 방지: 타임스탬프 + 랜덤 문자열 + 원본 파일명
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;

    // Supabase Storage에 업로드 (버킷 이름 통일)
    const { data, error } = await this.supabase.storage.from('user-profile-image').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('스토리지 업로드 에러:', error);
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }

    // 공개 URL 생성
    const { data: publicData } = this.supabase.storage.from('user-profile-image').getPublicUrl(data.path);

    console.log('업로드 성공:', {
      path: data.path,
      publicUrl: publicData.publicUrl,
    });

    return publicData.publicUrl; // 공개 URL 반환
  }


  async writeImageUpload(file: File){
    // 위에 있는 타임 스탬프
    const timestamp = Date.now();
    //확장자 가져오기
    const regex = /\.[a-zA-Z0-9]+$/
    //uuid 생성
    const uuid = crypto.randomUUID()
    const fileExtension = file.name.match(regex)

    const fileName = `${timestamp}_${uuid}${fileExtension}`
    const { data, error } = await this.supabase.storage
      .from("board-upload-image")
      .upload(fileName, file, { upsert: true })

    if (error) throw new Error(error.message);
    return data
  }
}
