'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { RootState } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Member, resetLoginMemberData } from '@/app/store/isLogin/loginSlice';
import { DeleteRefreshToken } from '@/app/services/login/refreshToken';
import { useRouter } from 'next/navigation';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const member: Member = useSelector((state: RootState) => state.login.member);
  const { id } = member;
  console.log(member);

  const handleLogout = async () => {
    await DeleteRefreshToken();
    dispatch(resetLoginMemberData());
    router.refresh();
  };
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
          {!id && (
            <>
              <Link className={`${styles.button} ${styles.login}`} href="/login">
                로그인
              </Link>
              <Link className={`${styles.button} ${styles.signup}`} href="/signup">
                회원가입
              </Link>
            </>
          )}

          {id && (
            <>
              <button className={`${styles.button} ${styles.login}`} onClick={handleLogout}>
                로그아웃
              </button>
              <Link className={`${styles.button} ${styles.login}`} href="/mypage">
                마이페이지
              </Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
