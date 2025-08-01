import axios from 'axios';

export const membersNum = async () => {
  const response = await axios.get('/api/member/count', {
    withCredentials: true,
  });

  return response;
};
