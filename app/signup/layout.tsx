import React from 'react';
import styles from './signupPage.module.scss';
import { Metadata } from 'next';

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: '회원가입',
  description:
    'JOB DAM 회원가입 페이지입니다. 멘토와 멘티를 연결하는 커리어 성장 플랫폼에 가입하고, 1:1 상담과 커뮤니티 기능을 이용해 보세요.',
  openGraph: {
    title: 'JOB DAM 회원가입',
    description: 'JOB DAM에 가입하고 멘토링, 채팅, 커뮤니티 기능을 통해 커리어 성장을 시작하세요.',
    type: 'website',
  },
};

const SignupLayout = ({ children }: IProps) => {
  return <main className={styles.signup_page_container}>{children}</main>;
};

export default SignupLayout;
