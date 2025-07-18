'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { RootState } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Member, resetLoginMemberData } from '@/app/store/isLogin/loginSlice';
import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { ChatRoomAlarm } from '@/app/types/alarm/chatroom';
import dayjs from 'dayjs';
import { Badge, Button, Chip, Modal } from '@mui/material';
import { chatroomService } from '@/app/services/chatroom/chatroom';
import { DeleteRefreshToken } from '@/app/services/login/refreshToken';
import { useRouter } from 'next/navigation';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const member: Member = useSelector((state: RootState) => state.login.member);
  const { id } = member;

  const handleLogout = async () => {
    await DeleteRefreshToken();
    dispatch(resetLoginMemberData());
    router.refresh();
  };

  const supabase = createClient();

  // const [user, setUser] = useState<Member>(member);
  const [alarm, setAlarm] = useState<ChatRoomAlarm[]>([]);
  const [modalAlarm, setModalAlarm] = useState(false);

  const { getOneChatRoom } = chatroomService;

  useEffect(() => {
    if (member?.id && member?.type === 1) {
      getOneChatRoom(member?.id).then((res) => setAlarm(res.result));
    }
  }, [member]);

  useEffect(() => {
    const channel = supabase.channel('alarm_chat_room' + member?.id);

    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_room',
        },
        (payload) => {
          setAlarm((prev) => [
            ...prev,
            { id: payload.new.id, title: payload.new.title, createdAt: payload.new.created_at },
          ]);
        },
      )
      .subscribe();
  }, [supabase]);

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

          {member.id && (
            <>
              <Link className={`${styles.button} ${styles.login}`} href="/mypage">
                마이페이지
              </Link>
              <button className={`${styles.button} ${styles.login}`} onClick={handleLogout}>
                로그아웃
              </button>
              {member?.type === 1 && (
                <Badge badgeContent={alarm?.length} color="primary">
                  <Button variant="contained" color="warning" onClick={() => setModalAlarm(true)}>
                    알림
                  </Button>
                </Badge>
              )}
            </>
          )}

          <Modal open={modalAlarm} onClose={() => setModalAlarm(false)}>
            <section className={styles.alarm_section}>
              <Chip className={styles.alarm_section_title} label="채팅방 신청 알람" color="default" />
              {alarm?.length === 0 && <p>도착한 알람이 없어요.</p>}
              {alarm?.length > 0 &&
                alarm?.map((item, index) => (
                  <div key={item?.id + index} className={styles.alarm_item}>
                    <p className={styles.alarm_item_title}>{item?.title}</p>
                    <p className={styles.alarm_item_date}>{dayjs(item?.createdAt).format('YY.MM.DD / HH:mm:ss')}</p>
                  </div>
                ))}
              <Button variant="contained" href="/mypage/chat">
                신청온 채팅방 보러가기
              </Button>
            </section>
          </Modal>
        </div>
      </section>
    </header>
  );
};

export default Header;
