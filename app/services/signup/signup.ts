import axios from 'axios';

// 회원가입 API 호출 함수 (올바른 axios 방식)
export const signUpService = async (memberData: any) => {
  try {
    let imageUrl = null;

    // 이미지가 있을 때만 업로드
    if (memberData.img && memberData.img instanceof File) {
      const formData = new FormData();
      formData.append('image', memberData.img); // 'img' → 'image'로 수정

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
        console.log('이미지 업로드 성공:', imageUrl);
      } else {
        throw new Error('이미지 업로드 실패');
      }
    }

    // 회원가입 데이터 준비 (이미지 URL 포함)
    const signUpData = {
      nickname: memberData.nickname,
      name: memberData.name,
      email: memberData.email,
      password: memberData.password,
      img: imageUrl, // 실제 스토리지 URL 또는 null
    };

    console.log('회원가입 데이터:', signUpData);

    // 회원가입 API 호출
    const signUpResponse = await axios.post('/api/signup', signUpData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return signUpResponse;
  } catch (error) {
    console.error('signUpService 에러:', error);
    throw error; // 에러를 상위로 전달
  }
};
