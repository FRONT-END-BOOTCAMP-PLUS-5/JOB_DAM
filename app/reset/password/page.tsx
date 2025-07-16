'use client';

import React, { useState } from 'react';
import styles from './reset.module.scss';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { useForm, useWatch } from 'react-hook-form';
import Image from 'next/image';
import eyeIcon from '@/app/public/images/show_password.svg';
import hidePasswordIcon from '@/app/public/images/no_show_image.svg';
import { resetPassword } from '@/app/services/reset/resetPassword';
import { useSearchParams } from 'next/navigation';
import { passwordCrypto } from '@/app/utils/signup/passwordCrypto';
import { useRouter } from 'next/navigation';

interface ResetPasswordForm {
  password: string;
  passwordConfirm: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    mode: 'onBlur',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: ResetPasswordForm) => {
    const email = searchParams.get('email');
    const userPassword = passwordCrypto(data.password);

    if (email) {
      await resetPassword(email, userPassword);
      router.push('/login');
    }
  };

  const watchPassword = useWatch({ control, name: 'password' });

  return (
    <main className={styles.forgot_password_container}>
      <div className={styles.forgot_password_form_container}>
        <header className={styles.forgot_password_header}>
          <Link href="/login">JOB담</Link>
          <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
        </header>
        <form className={styles.forgot_password_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_wrapper}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="새로운 비밀번호"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{8,15}$/,
                  message: '비밀번호는 특수문자 포함해서 8글자 이상 15자 이하로 작성해주세요.',
                },
              })}
            />
            <Image
              src={isPasswordVisible ? eyeIcon : hidePasswordIcon}
              alt="eye"
              width={20}
              height={20}
              onClick={handlePasswordVisibility}
            />
            {errors.password && <span className={styles.error_message}>{errors.password.message}</span>}
          </div>

          <div className={styles.input_wrapper}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="새로운 비밀번호 확인"
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) => value === watchPassword || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <Image
              src={isPasswordVisible ? eyeIcon : hidePasswordIcon}
              alt="eye"
              width={20}
              height={20}
              onClick={handlePasswordVisibility}
            />
            {errors.passwordConfirm && <span className={styles.error_message}>{errors.passwordConfirm.message}</span>}
          </div>

          <button type="submit">비밀번호 재설정</button>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
}
