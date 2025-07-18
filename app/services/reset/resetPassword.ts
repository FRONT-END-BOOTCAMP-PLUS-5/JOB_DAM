import axios from 'axios';

export const resetPassword = async (email: string, password: string) => {
  const response = await axios.patch(
    `/api/member`,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
