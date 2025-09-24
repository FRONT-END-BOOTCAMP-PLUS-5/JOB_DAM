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
      name: '',
      email: '',
      password: '',
      password_check: '',
      nickname: '',
      img: null,
      service_terms: false,
      privacy_terms: false,
      marketing_terms: false,
    },
  });

  const passwordInputValue = useWatch({ control, name: 'password' });

  const onSubmit = async (data: sign_up_form_type) => {
    try {
      await validation(data, router);
    } catch (error) {
      console.error('💥 onSubmit 에러:', error);
    }
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
    <div className={styles.signup_page_container_background} aria-label="회원가입 페이지">
      <form className={styles.signup_container} onSubmit={handleSubmit(onSubmit)}>
        <div aria-label="회원가입 제목" className={styles.signup_title_container}>
          <h1 className={styles.signup_title_text}>회원가입</h1>
          <p>당신의 커리어 여정을 함께 시작하세요</p>
        </div>

        <ImageForm register={register} setValue={setValue} errors={errors} />

        <div className={styles.signup_form_container}>
          {InputItem.map((item, i) => (
            <Input
              key={i}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              className={item.className}
              register={register}
              errors={errors}
              pattern={item.pattern}
              errorMessage={item.errorMessage}
              required={item.required}
              type={item.type}
              validate={(value) => {
                if (item.validate) {
                  const result = item.validate(value, passwordInputValue);
                  return result || true; // undefined이면 true 반환 (성공)
                }
                return true;
              }}
            />
          ))}

          {CheckBoxItem.map((item, i) => (
            <div key={i} className={styles.signup_check_box_container}>
              <input
                type="checkbox"
                aria-label={`${item.label}에 동의합니다`}
                className={styles.signup_check_box}
                {...register(item.name, {
                  required: item.name !== 'marketing_terms' ? `${item.label}에 동의해주세요.` : false,
                })}
              />
              {item.name !== 'marketing_terms' ? '(필수)' : '(선택)'}
              <span className={styles.signup_check_box_text}>{item.label}</span>에 동의합니다
            </div>
          ))}

          <button type="submit" disabled={isSubmitting} className={styles.signup_button}>
            {isSubmitting ? '처리 중...' : '회원가입'}
          </button>
        </div>

        <span className={styles.signup_login_link}>
          이미 회원이신가요?
          <Link href="/login">로그인</Link>
        </span>

        <ToastContainer autoClose={1000} role="alert" />
      </form>
    </div>
  );
}
