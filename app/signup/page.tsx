'use client';

import styles from './signupPage.module.scss';
import Input from '@/app/components/Input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/components/Button/index';
import ImageForm from '../components/ImageForm';

interface FormInput {
  nickname: string;
  name: string;
  email: string;
  email_certification: string;
  password: string;
  password_check: string;
  service_terms: boolean;
  privacy_terms: boolean;
  marketing_terms: boolean;
  profileImage?: File;
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    const memberData = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    };
    console.log('🎉 onSubmit 호출됨!');
    console.log('Form data:', data);
    console.log('Form errors:', errors);
    // 여기서 회원가입 API 호출
    fetch('/api/member', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  };

  return (
    <article className={styles.signup_page_container}>
      <header className={styles.signup_title_container}>
        <h1 className={styles.signup_title_text}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 시작하세요</p>
      </header>

      <form className={styles.signup_container} onSubmit={handleSubmit(onSubmit)}>
        <ImageForm />
        <div className={styles.signup_form_container}>
          <div className={styles.email_input_container}>
            <Input
              name="name"
              label="이름"
              placeholder="이메일을 입력해주세요"
              className={styles.signup_form_item}
              register={register}
            />
          </div>

          <Input
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            className={styles.signup_form_item}
            register={register}
          />

          <Input
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            className={styles.signup_form_item}
            register={register}
          />

          <Input
            name="password_check"
            label="비밀번호 확인"
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
