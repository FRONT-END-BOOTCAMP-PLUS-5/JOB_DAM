import axios from 'axios';
import { sign_up_form_type } from '@/app/types/signup/signup';

// 회원가입 API 호출 함수 (올바른 axios 방식)
export const signUpService = async (member_data: sign_up_form_type) => {
  try {
    let imageUrl = null;

    // 이미지가 있을 때만 업로드
    if (member_data.img && member_data.img instanceof File) {
      const formData = new FormData();
      formData.append('image', member_data.img); // 'img' → 'image'로 수정

      // 이미지 업로드
      const imageResponse = await axios.post('/api/storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData용 헤더
        },
      });

      // axios는 .data로 응답 데이터 접근
      const imageResult = imageResponse.data;

      if (imageResult.status === 200 && imageResult.imageUrl) {
        imageUrl = imageResult.imageUrl;
      } else {
        throw new Error('이미지 업로드 실패');
      }
    }

    // 회원가입 데이터 준비 (이미지 URL 포함)
    const signUpData = {
      nickname: member_data.nickname,
      name: member_data.name,
      email: member_data.email,
      password: member_data.password,
      img: imageUrl, // 실제 스토리지 URL 또는 null
      grade: 0,
    };

    // 회원가입 API 호출
    const signUpResponse = await axios.post('/api/signup', signUpData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return signUpResponse;
  } catch (error) {
    throw error; // 에러를 상위로 전달
  }
};
