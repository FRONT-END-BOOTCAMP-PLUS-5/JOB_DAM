'use client';

import Image from 'next/image';
import styles from './signupPage.module.scss';
import Input from '@/app/components/Input';
import { useForm } from 'react-hook-form';

interface FormInput {
  nickname: string;
}

export default function SignupPage() {
  const { register, handleSubmit } = useForm<FormInput>();

  return (
    <div className={styles.signup_page_container}>
      <div className={styles.signup_title_container}>
        <h1 className={styles.signup_title_text}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>
    </div>
  );
}
