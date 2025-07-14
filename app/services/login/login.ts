import axios from 'axios';

export const loginMember = async (memberData: { email: string; password: string }) => {
  const response = await axios.post('/api/login', memberData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return response;
};

export const handleLogin = async () => {
  const response = await axios.get('/api/login', {
    withCredentials: true,
  });

  console.log('사용자 정보 응답:', response); // 디버깅용
  return response;
};
