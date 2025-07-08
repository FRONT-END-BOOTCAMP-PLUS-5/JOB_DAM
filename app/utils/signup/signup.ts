import { TOAST_MESSAGES, memberDataType } from '@/app/constants/signup';
import { signUpService } from '@/app/services/signup/signup';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { toast } from 'react-toastify';

// ✅ Hook 제거, router를 매개변수로 받기
export const validation = async (data: sign_up_form_type, router: any) => {
  const { name, email, password, nickname, img } = data;

  const memberData = data;

  const signUpResponse = await signUpService(memberData);
  const takeMember = signUpResponse.data?.result;

  if (!data.service_terms || !data.privacy_terms) {
    toast.error(TOAST_MESSAGES.TERMS_ERROR);
    return false;
  }

  if (signUpResponse.status === 200) {
    if (takeMember) {
      if (takeMember.members?.email === email) {
        toast.error(TOAST_MESSAGES.DUPLICATE_EMAIL);
        return false;
      }
      if (takeMember.members?.nickname === nickname) {
        toast.error(TOAST_MESSAGES.DUPLICATE_NICKNAME);
        return false;
      }
      if (takeMember.members?.name === name) {
        toast.error(TOAST_MESSAGES.DUPLICATE_NAME);
        return false;
      }
    } else {
      toast.success(TOAST_MESSAGES.SUCCESS);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } else {
    toast.error(TOAST_MESSAGES.GENERAL_ERROR);
  }

  return true;
};
