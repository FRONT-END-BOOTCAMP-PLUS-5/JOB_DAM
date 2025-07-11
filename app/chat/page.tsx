'use client';

import { useEffect, useState } from 'react';

import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { TEST_MENTOR_ID } from '../constants/test';
import { createClient } from '../utils/supabase/client';
import { Chat } from '../types/mypage/chat';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [getMessage, setGetMessage] = useState<Chat[]>([]);

  const { insertChat, getChat } = chatService;

  const onChangeMessage = (value: string) => {
    setMessage(value);
  };

  const insertMessage = () => {
    const chatRef = {
      member_id: TEST_MENTOR_ID,
      chat_room_id: 3,
      content: message,
    };
    insertChat(chatRef).then((res) => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    createClient()
      .channel('custom-all-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat', filter: {} }, (payload) => {
        console.log('payload', payload.new);

        setGetMessage((prev) => [...prev, { ...payload.new }]);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    getChat(3).then((res) => {
      setGetMessage(res.result);
    });
  }, []);

  useEffect(() => {
    console.log('getMessage', getMessage);
  }, [getMessage]);

  return (
    <main className={styles.chat_container}>
      <section className={styles.chat_section}>
        <h1>채팅하기</h1>
        <section>
          {getMessage?.map((item, index) => (
            <p key={item?.content + index}>{item?.content}</p>
          ))}
        </section>

        <div className={styles.chat_enter}>
          <input type="text" placeholder="내용을 입력하세요." onChange={(e) => onChangeMessage(e.target.value)} />
          <button onClick={insertMessage}>입력</button>
        </div>
      </section>
    </main>
  );
};

export default ChatPage;
