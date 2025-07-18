import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

export const useAuth = () => {
  const member = useSelector((state: RootState) => state.login.member);

  return {
    member,
  };
};
