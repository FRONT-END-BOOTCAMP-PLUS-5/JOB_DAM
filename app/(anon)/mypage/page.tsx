'use client';

import Title from '@/app/components/Title';
import styles from './mypage.module.scss';

const Mypage = () => {
  return (
    <section className={styles.user_container}>
      <Title text="내 정보 보기" />
      <div className={styles.user_image}>
        <h5>이미지</h5>
      </div>
      <div className={styles.user_info}>
        <h5>이메일</h5>
        <p>wkdehdud3@naver.com</p>
      </div>
      <div className={styles.user_info}>
        <h5>이름</h5>
        <p>장도영</p>
      </div>
      <div className={styles.user_info}>
        <h5>닉네임</h5>
        <p>그럴수있지</p>
      </div>
    </section>
  );
};

export default Mypage;
