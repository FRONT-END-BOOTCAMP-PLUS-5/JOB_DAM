'use client';

import React from 'react';
import styles from './forgotPassword.module.scss';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<{ id: string }>();

  const onSubmit = async (data: { id: string }) => {
    // const findMember = await axios.get('/api/login', data);
    // console.log(findMember);

    const res = axios.post('/api/forgot-password', data).then((res) => {
      console.log(res);
    });
  };

  return (
    <main className={styles.forgot_password_container}>
      <div className={styles.forgot_password_form_container}>
        <header className={styles.forgot_password_header}>
          <Link href="/login">JOB담</Link>
          <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
        </header>
        <form className={styles.forgot_password_form} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="아이디를 입력해주세요" {...register('id', { required: true })} />
          <button type="submit">비밀번호 찾기</button>
        </form>
        <Link href="/login">로그인 페이지로 돌아가기</Link>
      </div>
    </main>
  );
}
