'use client';

import Image from 'next/image';
import styles from './signupPage.module.scss';
import Input from '@/app/components/Input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/components/Button/index';

interface FormInput {
  nickname: string;
  email: string;
  email_certification: string;
  password: string;
  password_check: string;
  service_terms: boolean;
  privacy_terms: boolean;
  marketing_terms: boolean;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    console.log('Form data:', data);
    // 여기서 회원가입 API 호출
  };

  return (
    <article className={styles.signup_page_container}>
      <header className={styles.signup_title_container}>
        <h1 className={styles.signup_title_text}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 시작하세요</p>
      </header>

      <form className={styles.signup_image_container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signup_image_container_item}>
          <Image
            src={'/images/userImage.svg'}
            alt="유저 이미지"
            width={70}
            height={70}
            className={styles.signup_image}
          />
          <Input
            name="nickname"
            label="닉네임"
            required={true}
            placeholder="닉네임을 입력해주세요"
            className={styles.signup_form_item}
            register={register}
          />
        </div>

        <div className={styles.signup_form_container}>
          <div className={styles.email_input_container}>
            <Input
              name="email"
              label="이메일"
              required={true}
              placeholder="이메일을 입력해주세요"
              className={styles.signup_form_item}
              register={register}
            />
            <button type="button" className={styles.verification_button}>
              인증
            </button>
          </div>

          <Input
            name="email_certification"
            label="이메일 인증"
            required={true}
            placeholder="인증번호를 입력하세요"
            className={styles.signup_form_item}
            register={register}
          />

          <Input
            name="password"
            label="비밀번호"
            required={true}
            placeholder="비밀번호를 입력해주세요"
            className={styles.signup_form_item}
            register={register}
          />

          <Input
            name="password_check"
            label="비밀번호 확인"
            required={true}
            placeholder="비밀번호를 다시 입력해주세요"
            className={styles.signup_form_item}
            register={register}
          />
        </div>

        <div className={styles.signup_check_box_container}>
          <input
            type="checkbox"
            className={styles.signup_check_box}
            {...register('service_terms', { required: '서비스 이용약관에 동의해주세요' })}
          />
          <p>(필수) 서비스 이용약관에 동의합니다</p>
        </div>

        <div className={styles.signup_check_box_container}>
          <input
            type="checkbox"
            className={styles.signup_check_box}
            {...register('privacy_terms', { required: '개인정보 처리방침에 동의해주세요' })}
          />
          <p>(필수) 개인정보 처리방침에 동의합니다</p>
        </div>

        <div className={styles.signup_check_box_container}>
          <input type="checkbox" className={styles.signup_check_box} {...register('marketing_terms')} />
          <p>(선택) 마케팅 정보 수신에 동의합니다</p>
        </div>

        <Button type="submit" typeStyle="submit" text="회원가입" />

        <span className={styles.signup_login_link}>
          이미 회원이신가요?
          <Link href="/login">로그인</Link>
        </span>
      </form>
    </article>
  );
}
