import { TOAST_MESSAGES } from '@/app/constants/signup';
import { signUpService } from '@/app/services/signup/signup';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { NextRouter } from 'next/router';
import { toast } from 'react-toastify';

// ✅ Hook 제거, router를 매개변수로 받기
export const validation = async (data: sign_up_form_type, router: NextRouter) => {
  const memberData = data;

  const signUpResponse = await signUpService(memberData);

  if (signUpResponse.status === 200) {
    if (signUpResponse.data.message) {
      toast.error(signUpResponse.data.message);
      return false;
    } else {
      toast.success(TOAST_MESSAGES.SUCCESS);
      router.push('/login');
      return true;
    }
  }

  return true;
};
