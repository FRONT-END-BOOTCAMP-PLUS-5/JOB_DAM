'use client';

import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
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
          <Link className={`${styles.button} ${styles.login}`} href="/login">
            로그인
          </Link>
          <Link className={`${styles.button} ${styles.signup}`} href="/signup">
            회원가입
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
