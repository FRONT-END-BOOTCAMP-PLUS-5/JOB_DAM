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
    <div className={styles.signupPageContainer}>
      <div className={styles.signupTitleContainer}>
        <h1 className={styles.signupTitleText}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>
      <div className={styles.signupImageContainer}>
        <Image src={'/images/userImage.svg'} alt="signupImage" width={50} height={50} />
        <Input
          name="nickname"
          label="닉네임"
          required
          placeholder="닉네임을 입력해주세요"
          className={styles.signupFormItem}
        />
      </div>
    </div>
  );
}
