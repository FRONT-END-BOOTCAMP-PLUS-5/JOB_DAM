import axios from 'axios';

export const getAllMember = async () => {
  const response = await axios.get('/api/member', {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};
