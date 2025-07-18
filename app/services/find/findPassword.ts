import axios from 'axios';

interface FormData {
  from: string;
  email: string;
  title: string;
  content: string;
}

export const findPassword = async (formData: FormData, random: number) => {
  const response = await axios.post(
    '/api/sendemail',
    { ...formData, random },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.data;
};

export const findMember = async (email: string) => {
  const response = await axios.post(`/api/member`, email, { headers: { 'Content-Type': 'application/json' } });
  return response.data;
};
