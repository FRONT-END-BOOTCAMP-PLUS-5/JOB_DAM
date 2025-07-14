'use client';

import { useEffect, useState } from 'react';
import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { ChatRoom } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Member } from '../store/isLogin/loginSlice';
import Link from 'next/link';

const ChatPage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [user, setUser] = useState<Member>(member);

  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);

  const { getChatRoom } = chatService;

  useEffect(() => {
    if (user?.id) {
      getChatRoom(user?.id).then((res) => {
        setChatRoom(res.result);
      });
    }
  }, [user]);

  useEffect(() => {
    setUser(member);
  }, [member]);

  return (
    <main className={styles.chat_container}>
      <section className={styles.content_wrap}>
        <ul className={styles.chat_room_list}>
          {chatRoom &&
            chatRoom?.map((item, index) => (
              <li key={item?.id + index} className={styles.chat_room_item}>
                <Link href={`/chat/` + item?.id}>
                  <span className={styles.profile_image} />
                  <div className={styles.chat_room_title}>
                    <span className={styles.title}>{item?.title}</span>
                    <span className={styles.mentor_name}>{item?.createMember?.name}</span>
                  </div>
                  <div className={styles.date_member}>
                    <span className={styles.date}>{dayjs(item?.createdAt).format('YY. MM. DD')}</span>
                    <span className={styles.chat_room_member}>
                      {item?.chatMember.length} / {item?.maxPeople}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default ChatPage;
