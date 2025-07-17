'use client';

import Input from '@/app/components/common/Input';
import { useForm, useWatch } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/components/common/Button/index';
import ImageForm from '@/app/components/common/ImageForm';
import { ToastContainer } from 'react-toastify';
import { sign_up_form_type } from '@/app/types/signup/signup';
import { validation } from '@/app/utils/signup/signup';
import { useRouter } from 'next/navigation';
import styles from './signupPage.module.scss';

export default function SignupPage() {
  const router = useRouter();

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

  const passwordValue = useWatch<sign_up_form_type>({ control, name: 'password' });
  const passwordCheckValue = useWatch<sign_up_form_type>({ control, name: 'password_check' });

  const passwordCheckPattern = passwordValue === passwordCheckValue;

  const onSubmit = async (data: sign_up_form_type) => {
    // ✅ 위에서 선언한 router 사용
    await validation(data, router);
  };

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
            <Input
              name="name"
              label="이름"
              placeholder="이름을 입력해주세요"
              className={styles.signup_form_item}
              register={register}
              errors={errors}
              pattern={/^[가-힣]{2,10}$/}
              errorMessage="이름은 한글만 사용할 수 있습니다"
              required
            />

            <Input
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              className={styles.signup_form_item}
              register={register}
              errors={errors}
              pattern={/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/}
              errorMessage="이메일 형식이 올바르지 않습니다"
              required
              type="email"
            />

            <Input
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              className={styles.signup_form_item}
              register={register}
              errors={errors}
              pattern={/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/}
              errorMessage="비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 15자 이하이어야 합니다"
              required
              type="password"
            />

            <Input
              name="password_check"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              className={styles.signup_form_item}
              register={register}
              errors={errors}
              passwordCheckPattern={passwordCheckPattern}
              errorMessage="비밀번호가 일치하지 않습니다"
              required
              type="password"
            />

            <div className={styles.signup_check_box_container}>
              <input type="checkbox" className={styles.signup_check_box} {...register('service_terms', {})} />
              <p>
                (필수) <span className={styles.signup_check_box_text}>서비스 이용약관</span>에 동의합니다
              </p>
            </div>

            <div className={styles.signup_check_box_container}>
              <input type="checkbox" className={styles.signup_check_box} {...register('privacy_terms', {})} />
              <p>
                (필수) <span className={styles.signup_check_box_text}>개인정보 처리방침</span>에 동의합니다
              </p>
            </div>

            <div className={styles.signup_check_box_container}>
              <input type="checkbox" className={styles.signup_check_box} {...register('marketing_terms')} />
              <p className={styles.signup_check_text}>(선택) 마케팅 정보 수신에 동의합니다</p>
            </div>

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
