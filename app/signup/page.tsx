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
    <header className={styles.signup_page_container}>
      <div className={styles.signup_title_container}>
        <h1 className={styles.signup_title_text}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>

      <section className={styles.signup_image_container}>
        <div className={styles.signup_image_container_item}>
          <Image src={'/images/userImage.svg'} alt="유저 이미지" width={50} height={50} />
          <Input
            name="nickname"
            label="닉네임"
            required={true}
            placeholder="닉네임을 입력해주세요"
            className={styles.signup_form_item}
          />
        </div>
      </section>
    </header>
  );
}
