'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { Button, Flex } from 'antd';

const Header = () => {
  return (
    <header className={styles.header}>
      <section className={styles.header_container}>
        <div className={styles.logo}>
          <Link href="/">JOB담</Link>
        </div>
        <nav className={styles.header_nav}>
          <Link href="/">멘토 찾기</Link>
          <Link href="/">커뮤니티</Link>
          <Link href="/">채팅하기</Link>
        </nav>
        <Flex justify="center" align="center" gap={15}>
          <Button type="primary" href="/">
            로그인
          </Button>
          <Button type="default" href="/">
            회원가입
          </Button>
        </Flex>
      </section>
    </header>
  );
};

export default Header;
