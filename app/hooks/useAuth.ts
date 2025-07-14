import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export const useAuth = () => {
  const member = useSelector((state: RootState) => state.login.member);

  // 🔹 로그인 상태 확인 (id가 있으면 로그인된 상태)
  const isLoggedIn = member.id !== '';

  return {
    isLoggedIn,
    member,
  };
};
