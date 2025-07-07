'use client';

import styles from './signupPage.module.scss';
import Input from '@/app/components/Input';
import { useForm, useWatch } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/app/components/Button/index';
import ImageForm from '../components/ImageForm';
import { useRouter } from 'next/navigation'; // Next.js 13+ App Router
import Image from 'next/image';

interface FormInput {
  name: string;
  email: string;
  email_certification?: string;
  password: string;
  password_check: string;
  service_terms: boolean;
  privacy_terms?: boolean;
  marketing_terms?: boolean;
  img?: File;
  nickname: string;
}

// 회원가입 API 호출 함수 (JSON 방식)
const signupMember = async (memberData: any) => {
  const response = await fetch('/api/member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다');
  }

  return response.json();
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormInput>();

  const passwordValue = useWatch({ control, name: 'password' });
  const passwordCheckValue = useWatch({ control, name: 'password_check' });

  const passwordCheckPattern = passwordValue === passwordCheckValue;
  const isDisabled = Object.keys(errors).length > 0 || !passwordCheckPattern;

  const router = useRouter();

  const onSubmit = (data: FormInput) => {
    const { name, email, password, nickname, img } = data;

    try {
      // JSON 데이터 생성
      const memberData = {
        name: name,
        email: email,
        password: password,
        nickname: nickname,
        img: img?.name || '',
      };

      console.log('전송할 memberData:', memberData);

      signupMember(memberData).then((res) => {
        console.log(res);
        if (res.status === 500) {
          router.push('/login');
        }
      });
    } catch (err) {
      throw err;
    }
  };

  const onError = (errors: any) => {
    console.log(errors);

    // 현재 입력된 값들을 가져오기
    const formValues = control._formValues;

    // 필수 필드들이 모두 입력되어 있는지 확인
    const hasAllRequiredFields =
      formValues.name &&
      formValues.email &&
      formValues.password &&
      formValues.password_check &&
      formValues.nickname &&
      passwordCheckPattern; // 비밀번호가 일치하는지도 확인

    // 필수 필드가 모두 채워져 있을 때만 체크박스 관련 알림 표시
    if (hasAllRequiredFields) {
      if (errors.service_terms) {
        alert('서비스 이용약관에 동의해주세요');
        return;
      }

      if (errors.privacy_terms) {
        alert('개인정보 처리방침에 동의해주세요');
        return;
      }
    }
  };

  return (
    <article className={styles.signup_page_container}>
      <header className={styles.signup_title_container}>
        <h1 className={styles.signup_title_text}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 시작하세요</p>
      </header>

      <form className={styles.signup_container} onSubmit={handleSubmit(onSubmit, onError)}>
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
          />

          <Input
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            className={styles.signup_form_item}
            register={register}
            errors={errors}
            pattern={/^[a-zA-Z0-9!@#$%^&*]{8,20}$/}
            errorMessage="비밀번호는 특수문자 포함 8자 이상 20자 이하이어야 합니다"
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
        </div>

        <div className={styles.signup_check_box_container}>
          <input
            type="checkbox"
            className={styles.signup_check_box}
            {...register('service_terms', {
              required: '서비스 이용약관에 동의해주세요',
              validate: (value) => value || '서비스 이용약관에 동의해주세요',
            })}
          />
          <p>(필수) 서비스 이용약관에 동의합니다</p>
        </div>

        <div className={styles.signup_check_box_container}>
          <input
            type="checkbox"
            className={styles.signup_check_box}
            {...register('privacy_terms', {
              required: '개인정보 처리방침에 동의해주세요',
              validate: (value) => value || '개인정보 처리방침에 동의해주세요',
            })}
          />
          <p>(필수) 개인정보 처리방침에 동의합니다</p>
        </div>

        <div className={styles.signup_check_box_container}>
          <input type="checkbox" className={styles.signup_check_box} {...register('marketing_terms')} />
          <p>(선택) 마케팅 정보 수신에 동의합니다</p>
        </div>

        <Button type="submit" typeStyle="submit" text="회원가입" disabled={isDisabled} />

        <span className={styles.signup_login_link}>
          이미 회원이신가요?
          <Link href="/login">로그인</Link>
        </span>
      </form>
    </article>
  );
}
