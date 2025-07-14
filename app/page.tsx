'use client';

import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const member = useSelector((state: RootState) => state.login.member);

  return <div>메인</div>;
}
