'use client';

import Link from 'next/link';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer_content}>
        <div className={styles.logo}>
          <h1>JOB담</h1>
          <p>
            개발자의 성장을 돕는 멘토링 플랫폼입니다. <br />
            전문가와의 멘토링부터 실시간 Q&A까지, <br />
            당신의 커리어 여정을 함께합니다
          </p>
        </div>

        <nav className={styles.footer_nav}>
          <Link href="/public">멘토찾기</Link>
          <Link href="/public">커뮤니티</Link>
          <Link href="/public">채팅하기</Link>
        </nav>
      </section>
      <h3 className={styles.copyright}>jobdam @ 2025. All rights reserved </h3>
    </footer>
  );
};

export default Footer;
