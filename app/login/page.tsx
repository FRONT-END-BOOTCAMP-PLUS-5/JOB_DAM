'use client';

import styles from './loginPage.module.scss';
import LoginForm from '@/app/components/LoginForm';

function LoginPage() {
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
