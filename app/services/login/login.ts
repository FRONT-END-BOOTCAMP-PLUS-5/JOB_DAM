import axios from 'axios';

export const loginMember = async (memberData: { email: string; password: string }) => {
  const response = await axios.post('/api/login', memberData, {
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(response);

  return response;
};
