'use client';

import Title from '@/app/components/common/Title';
import styles from './mypage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { Member } from '../store/isLogin/loginSlice';
import Image from 'next/image';

const Mypage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [user, setUser] = useState<Member>(member);

  useEffect(() => {
    setUser(member);
  }, [member]);

  return (
    <section className={styles.user_container}>
      <Title text="내 정보 보기" />
      <div className={styles.user_image}>{user.img && <Image src={user?.img} alt="" fill />}</div>
      <div className={styles.user_info}>
        <h5>이메일</h5>
        <p>{user?.email}</p>
      </div>
      <div className={styles.user_info}>
        <h5>이름</h5>
        <p>{user?.name}</p>
      </div>
      <div className={styles.user_info}>
        <h5>닉네임</h5>
        <p>{user?.nickname}</p>
      </div>
    </section>
  );
};

export default Mypage;
