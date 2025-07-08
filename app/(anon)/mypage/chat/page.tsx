'use client';

import { TEST_USER_ID } from '@/app/constants/test';
import { chatService } from '@/app/services/mypage/chat';
import { ChatRoom } from '@/app/types/mypage/chat';
import { useEffect, useState } from 'react';

import styles from './chatPage.module.scss';
import dayjs from 'dayjs';

const ChatPage = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);

  const { getChatRoom } = chatService();

  useEffect(() => {
    getChatRoom(TEST_USER_ID).then((res) => {
      setChatRoom(res.result);
    });
  }, []);

  return (
    <section>
      <ul className={styles.chat_room_ul}>
        {chatRoom?.map((item, index) => (
          <li className={styles.chat_room} key={item.title + index}>
            <p className={styles.mentor_image}>
              <span>프로필</span>
            </p>
            <div className={styles.chat_room_info}>
              <h2>
                {item?.title} ({item?.chatMember.length})
              </h2>
              <p>
                {item?.createMember?.name} <span className={styles.mentor_mark}>멘토</span>
              </p>
              <span className={styles.created_date}>{dayjs(item?.createdAt).format('YYYY.MM.DD')}</span>
            </div>
            <div className={styles.button_wrap}>
              <button>리뷰쓰기</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChatPage;
