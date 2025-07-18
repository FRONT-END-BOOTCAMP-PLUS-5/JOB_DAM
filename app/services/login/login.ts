import axios from 'axios';
import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 1000,
};

export const loginMember = async (memberData: { email: string; password: string }) => {
  const response = await axios.post('/api/login', memberData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  const { message } = response.data;

  if (message === '회원 정보가 없습니다.') {
    toast.error('회원 정보가 없습니다.', toastConfig);
  } else if (message === '비밀번호가 일치하지 않습니다.') {
    toast.error('비밀번호가 일치하지 않습니다.', toastConfig);
  } else if (message === '일치하는 이메일이 없습니다.') {
    toast.error('일치하는 이메일이 없습니다.', toastConfig);
  }

  return response;
};

export const handleLogin = async () => {
  const response = await axios.get('/api/login', {
    withCredentials: true,
  });

  return response;
};
