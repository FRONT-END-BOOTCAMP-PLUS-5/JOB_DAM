import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './loginForm.module.scss';
import Input from '@/app/components/common/Input';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { handleLogin, loginMember } from '@/app/services/login/login';
import { useDispatch } from 'react-redux';
import { setLoginState } from '@/app/store/isLogin/loginSlice';

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const dispatch = useDispatch();

    try {
      const response = await loginMember(data);

      if (response.data.status === 200) {
        const userResponse = await handleLogin();
        if (userResponse.data.status === 200) {
          dispatch(setLoginState.setLoginMemberData(userResponse.data.result));
        }
      }
    } catch (error) {
      toast.error('로그인 실패');
    }
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
        pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        errorMessage="이메일 형식이 올바르지 않습니다."
        errors={errors}
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
        pattern={/^(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{8,15}$/}
        errorMessage="비밀번호는 특수문자 포함해서 8글자이상 15이하로 작성해주세요."
        errors={errors}
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
