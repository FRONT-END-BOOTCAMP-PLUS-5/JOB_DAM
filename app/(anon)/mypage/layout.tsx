'use client';

import MypageSnb from '@/app/components/MypageSnb';
import styles from './mypageLayout.module.scss';

interface IProps {
  children: React.ReactNode;
}

const MypageLayout = ({ children }: IProps) => {
  return (
    <div className={styles.align_container}>
      <main className={styles.container}>
        <MypageSnb />
        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
};

export default MypageLayout;
