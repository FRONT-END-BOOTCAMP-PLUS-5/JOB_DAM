'use client';

import MypageSnb from '@/app/components/common/MypageSnb';
import styles from './mypageLayout.module.scss';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface IProps {
  children: React.ReactNode;
}

const MypageLayout = ({ children }: IProps) => {
  const router = useRouter();
  const member = useSelector((state: RootState) => state.login.member);

  useEffect(() => {
    if (!member.id) {
      toast.warning('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, [member]);

  return (
    <div className={styles.align_container}>
      <main className={styles.container}>
        <MypageSnb />
        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
};

export default MypageLayout;
