import { signUpService } from '@/app/services/signup/signup';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

// ✅ Hook 제거, router를 매개변수로 받기
export const validation = async (data: sign_up_form_type, router: AppRouterInstance) => {
  // ✅ 필수 약관 동의 검증 추가
  if (!data.service_terms) {
    toast.error('서비스 이용약관에 동의해주세요.');
    return;
  }

  if (!data.privacy_terms) {
    toast.error('개인정보 처리방침에 동의해주세요.');
    return;
  }

  const memberData = data;

  const signUpResponse = await signUpService(memberData);

  if (signUpResponse.data.status === 200) {
    if (signUpResponse.data.message) {
      // 중복 체크 실패
      toast.error(signUpResponse.data.message);
    } else {
      // 회원가입 성공
      toast.success('회원가입에 성공했습니다!', {
        position: 'top-right',
        autoClose: 500,
        onClose: () => router.push('/login'),
      });
    }
  } else {
    // 서버 에러 처리
    toast.error(signUpResponse.data.message);
  }
};
