'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import { Member } from '@/app/store/isLogin/loginSlice';
import { useEffect, useState } from 'react';

const Header = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [user, setUser] = useState<Member>(member);

  useEffect(() => {
    setUser(member);
  }, [member]);

  return (
    <header className={styles.header}>
      <section className={styles.header_container}>
        <div className={styles.logo}>
          <Link href="/">JOB담</Link>
        </div>
        <nav className={styles.header_nav}>
          <Link href="/mentor">멘토 찾기</Link>
          <Link href="/board">커뮤니티</Link>
          <Link href="/chat">채팅하기</Link>
        </nav>
        <div className={styles.user_nav}>
          {!user.id && (
            <>
              <Link className={`${styles.button} ${styles.login}`} href="/login">
                로그인
              </Link>
              <Link className={`${styles.button} ${styles.signup}`} href="/signup">
                회원가입
              </Link>
            </>
          )}

          {user.id && (
            <Link className={`${styles.button} ${styles.login}`} href="/mypage">
              마이페이지
            </Link>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
