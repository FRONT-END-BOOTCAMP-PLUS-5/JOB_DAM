import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './loginForm.module.scss';
import Input from '@/app/components/Input';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { loginMember } from '@/app/services/login/login';

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    loginMember(data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('로그인 성공!', {
            position: 'top-left',
            autoClose: 2000,
          });
          console.log('사용자 정보:', res.data.result);
          // 로그인 성공 후 원하는 페이지로 이동
          // router.push('/board');
        } else {
          toast.error(res.data.message, {
            position: 'top-left',
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
        if (error.response?.data?.status === 401) {
          alert(error.response.data.message || '이메일 또는 비밀번호가 일치하지 않습니다.');
        } else {
          alert('로그인 중 오류가 발생했습니다.');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
      <Input
        label="이메일"
        type="email"
        required={true}
        name="email"
        placeholder="이메일을 입력해주세요."
        register={register}
        className={styles.login_form_input}
        containerClassName={styles.login_form_item}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        required={true}
        placeholder="비밀번호를 입력해주세요."
        className={styles.login_form_input}
        containerClassName={styles.login_form_item}
        register={register}
      />
      <div className={styles.login_form_checkbox}>
        <div className={styles.login_form_checkbox_item}>
          <input type="checkbox" />
          <label>로그인 상태 유지</label>
        </div>
        <Link href="/login/findPassword">비밀번호 찾기</Link>
      </div>
      <input type="submit" className={styles.login_button} value="로그인" />
      <span>
        아직 회원이 아니신가요? <Link href="/signup">회원기입</Link>
      </span>
      <ToastContainer />
    </form>
  );
}
