'use client';

import { useState } from 'react';
import styles from './loginPage.module.scss';
import LoginForm from './loginForm';

function LoginPage() {
  return (
    <main className={styles.loginPageContainer}>
      <div className={styles.loginTitle}>
        <h1 className={styles.loginTitleText}>로그인</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>
      <LoginForm />
    </main>
  );
}

export default LoginPage;
