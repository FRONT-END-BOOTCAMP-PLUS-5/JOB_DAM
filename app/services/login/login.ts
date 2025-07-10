import axios from 'axios';

export const loginMember = async (memberData: { email: string; password: string }) => {
  const response = await axios.get('/api/member', {
    params: memberData, // data 대신 params 사용
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};
