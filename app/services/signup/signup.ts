import axios from 'axios';

// 회원가입 API 호출 함수 (올바른 axios 방식)
export const signUpService = async (memberData: any) => {
  const signUpResponse = await axios.post('/api/signup', memberData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return signUpResponse;
};
