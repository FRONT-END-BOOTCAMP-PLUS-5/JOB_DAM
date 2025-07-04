'use client';

import styles from './application.module.scss';

const Application = () => {
  return (
    <section className={styles.user_container}>
      <h3>멘토 신청하기</h3>
      <div className={styles.input_box}>
        <h4>회사이름</h4>
        <input type="text" placeholder="회사이름" />
      </div>
      <div className={styles.input_box}>
        <h4>직급</h4>
        <input type="text" placeholder="직급" />
      </div>
      <div className={styles.input_box}>
        <h4>근무기간</h4>
        <div>
          <input type="date" />~
          <input type="date" />
        </div>
      </div>
    </section>
  );
};

export default Application;
