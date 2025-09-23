import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './loginForm.module.scss';
import Input from '@/app/components/common/Input';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { loginMember } from '@/app/services/login/login';
import { useDispatch } from 'react-redux';
import { setLoginMemberData } from '@/app/store/isLogin/loginSlice';
import { useRouter } from 'next/navigation';
import { LoginItem, LoginItemType } from '@/app/constants/login';

type FormInput = Record<LoginItemType['name'], string>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const response = await loginMember(data);

      if (response.data.status === 401) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.status === 200) {
        // 🔹 POST 응답에서 바로 유저 정보를 Redux에 저장
        dispatch(setLoginMemberData(response.data.user));
        toast.success('로그인 성공', {
          position: 'top-right',
          autoClose: 1000,
          onClose: () => router.push('/'),
        });
      }
    } catch {
      toast.error('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
      {LoginItem.map((item: LoginItemType, i) => (
        <Input
          key={i}
          label={item.label}
          type={item.type}
          required={item.required}
          name={item.name}
          placeholder={item.placeholder}
          className={item.className}
          containerClassName={item.containerClassName}
          pattern={item.pattern}
          errorMessage={item.errorMessage}
          register={register}
          errors={errors}
        />
      ))}

      <div className={styles.login_form_checkbox_item}>
        <input type="checkbox" className={styles.login_form_checkbox_input} />
        <p className={styles.login_form_checkbox_label}>로그인 상태 유지</p>
        <Link href="/find/password" className={styles.login_form_checkbox_link}>
          비밀번호 찾기
        </Link>
      </div>
      <button type="submit" className={styles.login_button} disabled={isSubmitting}>
        로그인
      </button>
      <span>
        아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
      </span>
      <ToastContainer />
    </form>
  );
}
