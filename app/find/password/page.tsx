'use client';

import React, { useEffect, useState } from 'react';
import styles from './forgotPassword.module.scss';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';
import { findMember, findPassword } from '@/app/services/find/findPassword';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface FindPasswordForm {
  email: string;
  from: string;
  title: string;
  content: string;
  random: number;
}

interface FindPasswordFormCertification {
  email: string;
  random: number;
}

export default function FindPasswordPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FindPasswordForm>({
    mode: 'onBlur',
  });

  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [disabledCertification, setDisabledCertification] = useState(false);
  const [certification, setCertification] = useState(false);

  const [sentRandomNumber, setSentRandomNumber] = useState<number>(0); // 발송된 인증번호 저장
  const [formData, setFormData] = useState<FindPasswordForm>({
    from: 'JOB담',
    email: '',
    title: 'JOB담 비밀번호 찾기',
    content: 'JOB담 비밀번호 찾기 메일입니다.',
    random: 0,
  });

  const watchRandom = useWatch({ control, name: 'random' });

  // 실시간으로 인증번호 일치 여부 확인
  useEffect(() => {
    if (watchRandom && sentRandomNumber && certification) {
      const isMatch = Number(watchRandom) === sentRandomNumber;

      if (isMatch) {
        setDisabled(false); // 일치하면 버튼 활성화
        toast.success('인증번호가 일치합니다.', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    }
  }, [watchRandom, sentRandomNumber, certification]);

  // 인증번호 화인 버튼 누르면 그 때 인증번호룰 본내야 함
  const handleCertification = async () => {
    //인증을 클릭하면 그 때 인증번호가 가야함
    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    setFormData({ ...formData, random: randomNumber });
    setSentRandomNumber(randomNumber); // 발송된 인증번호 저장

    const res = await findPassword(formData, randomNumber);
    if (res.message === '이메일이 성공적으로 보내졌습니다.') {
      toast.success('인증번호를 이메일로 보냈습니다..', {
        position: 'top-right',
        autoClose: 1000,
      });
      setDisabledCertification(true);
    }
  };

  const onSubmit = async (data: FindPasswordFormCertification) => {
    //이메일이 유효한지 학인
    if (!certification) {
      const res = await findMember(data.email);
      if (res.status === 200) {
        setFormData({ ...formData, email: data.email });
        setCertification(true);
        setDisabled(true);
        toast.info('이메일을 확인했습니다. 인증번호 받기를 입력해주시고 인증번호를 입력해주세요!', {
          position: 'top-right',
          autoClose: 1000,
        });
      } else {
        toast.error('이메일이 유효하지 않습니다!.', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    }
    if (certification) {
      const matchCertification = Number(formData.random) === Number(data.random);
      if (matchCertification) {
        setDisabled(true);
        toast.success('인증번호가 일치합니다. 비밀번호 재설정 페이지로 이동합니다.', {
          position: 'top-right',
          autoClose: 1000,
        });
        router.push(`/reset/password?email=${data.email}`);
      } else {
        toast.error('인증번호가 일치하지 않습니다.', {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <main className={styles.forgot_password_container}>
      <div className={styles.forgot_password_form_container}>
        <header className={styles.forgot_password_header}>
          <Link href="/login">JOB담</Link>
          <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
        </header>
        <form className={styles.forgot_password_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.forgot_password_form_input_container}>
            <label>이메일</label>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않습니다.',
                },
              })}
            />
            {errors.email && <span className={styles.error_message}>{errors.email.message}</span>}
          </div>
          {certification && (
            <div className={styles.forgot_password_form_input_container_certification}>
              <input
                type="text"
                placeholder="인증번호5 자리를 입력해주세요"
                {...register('random', {
                  required: true,
                  pattern: { value: /^[0-9]{5}$/, message: '인증번호는 5자리 숫자여야 합니다.' },
                })}
              />
              <button onClick={handleCertification} disabled={disabledCertification}>
                인증번호 받기
              </button>
              {errors.random && <span className={styles.error_messages_certification}>{errors.random.message}</span>}
            </div>
          )}
          <button type="submit" disabled={disabled}>
            비밀번호 찾기
          </button>
        </form>

        <Link href="/login">로그인 페이지로 돌아가기</Link>
      </div>
      <ToastContainer />
    </main>
  );
}
