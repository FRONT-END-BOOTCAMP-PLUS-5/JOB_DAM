import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './loginForm.module.scss';
import Input from '@/app/components/Input';
import Link from 'next/link';

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <Input label="이메일" register={register} required={true} name="email" placeholder="이메일을 입력해주세요." />
      <Input
        label="비밀번호"
        name="password"
        register={register}
        required={true}
        placeholder="비밀번호를 입력해주세요."
      />
      <div className={styles.loginFormCheckbox}>
        <div className={styles.loginFormCheckboxItem}>
          <input type="checkbox" />
          <label>로그인 상태 유지</label>
        </div>
        <Link href="/login/findPassword">비밀번호 찾기</Link>
      </div>
      <input type="submit" className={styles.loginButton} value="로그인" />
      <span>
        아직 회원이 아니신가요? <Link href="/">회원기입</Link>
      </span>
    </form>
  );
}
