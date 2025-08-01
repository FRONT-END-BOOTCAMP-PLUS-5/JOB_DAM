'use client';

import Input from '@/app/components/common/Input';
import { useForm, useWatch } from 'react-hook-form';
import Link from 'next/link';
import ImageForm from '@/app/components/common/ImageForm';
import { ToastContainer } from 'react-toastify';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { validation } from '@/app/utils/signup/signup';
import { useRouter } from 'next/navigation';
import styles from './signupPage.module.scss';
import { CheckBoxItem, InputItem } from '../constants/signup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import IsLogin from '../components/common/IsLogin';

export default function SignupPage() {
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.login.member);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<sign_up_form_type>({
    mode: 'onBlur',
    defaultValues: {
      service_terms: false,
      privacy_terms: false,
      marketing_terms: false, // 추가
    },
  });

  const passwordInputValue = useWatch({ control, name: 'password' });

  const onSubmit = async (data: sign_up_form_type) => {
    // ✅ 위에서 선언한 router 사용
    await validation(data, router);
  };

  useEffect(() => {
    if (userData.id) {
      router.replace('/');
    }
  }, [userData.id]);

  if (userData.id) {
    return <IsLogin />;
  }

  return (
    <article className={styles.signup_page_container}>
      <div className={styles.signup_page_container_background}>
        <form className={styles.signup_container} onSubmit={handleSubmit(onSubmit)}>
          <header className={styles.signup_title_container}>
            <h1 className={styles.signup_title_text}>회원가입</h1>
            <p>당신의 커리어 여정을 함께 시작하세요</p>
          </header>

          <ImageForm register={register} setValue={setValue} errors={errors} />

          <div className={styles.signup_form_container}>
            {InputItem.map((item, i) => (
              <Input
                key={i}
                name={item.name as keyof sign_up_form_type}
                label={item.label}
                placeholder={item.placeholder}
                className={item.className}
                register={register}
                errors={errors}
                pattern={item.pattern}
                errorMessage={item.errorMessage}
                required={item.required}
                type={item.type}
                validate={(value) => item.validate?.(value, passwordInputValue) || ''}
              />
            ))}

            {CheckBoxItem.map((item, i) => (
              <div key={i} className={styles.signup_check_box_container}>
                <input
                  type="checkbox"
                  className={styles.signup_check_box}
                  {...register(item.name as keyof sign_up_form_type)}
                />
                <p>
                  (필수) <span className={styles.signup_check_box_text}>{item.label}</span>에 동의합니다
                </p>
              </div>
            ))}

            <button type="submit" disabled={isSubmitting} className={styles.signup_button}>
              회원가입
            </button>
          </div>

          <span className={styles.signup_login_link}>
            이미 회원이신가요?
            <Link href="/login">로그인</Link>
          </span>

          <ToastContainer autoClose={1000} role="alert" />
        </form>
      </div>
    </article>
  );
}
