'use client';

import Title from '@/app/components/common/Title';
import styles from './mypage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Spinner from '../components/common/Spinner';

const Mypage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (member?.id) {
      setLoading(false);
    }
  }, [member]);

  return (
    <section className={styles.user_container}>
      <Title text="내 정보 보기" />
      {loading && <Spinner size={80} />}
      {!loading && (
        <>
          <div className={styles.user_image}>{member.img && <Image src={member?.img} alt="" fill />}</div>
          <div className={styles.user_info}>
            <h5>이메일</h5>
            <p>{member?.email}</p>
          </div>
          <div className={styles.user_info}>
            <h5>이름</h5>
            <p>{member?.name}</p>
          </div>
          <div className={styles.user_info}>
            <h5>닉네임</h5>
            <p>{member?.nickname}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Mypage;
