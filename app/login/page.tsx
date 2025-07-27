'use client';

import { useSelector } from 'react-redux';
import styles from './loginPage.module.scss';
import LoginForm from '@/app/components/common/LoginForm';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IsLogin from '../components/common/IsLogin';

function LoginPage() {
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.login.member);

  useEffect(() => {
    if (userData.id) {
      router.replace('/');
    }
  }, [userData.id]);

  if (userData.id) {
    return <IsLogin />;
  }

  return (
    <div className={styles.login_page_container}>
      <div className={styles.login_title}>
        <h1 className={styles.login_title_text}>로그인</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
