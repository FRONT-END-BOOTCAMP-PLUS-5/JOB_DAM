'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { Chat } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { useChatScroll } from '../hooks/useChatScroll';
import { useRealtimeChat } from '../hooks/useRealTimeChat';

const CHAT_ROOM_ID = 43;

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [userId, setUserId] = useState({ name: '', id: '' });

  const { insertChat, getChat } = chatService;
  const { containerRef, scrollToBottom } = useChatScroll();
  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName: `chat-room-${CHAT_ROOM_ID}`,
    username: userId?.name,
    userId: userId?.id,
  });

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessage, ...realtimeMessages];

    const sortedMessages = mergedMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return sortedMessages;
  }, [initialMessage, realtimeMessages]);

  const onChangeMessage = (value: string) => {
    return setNewMessage(value);
  };

  const handleSendMessage = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const chatRef = {
        member_id: userId?.id,
        chat_room_id: CHAT_ROOM_ID,
        content: newMessage,
      };

      if (e.key !== 'Enter') return;
      if (!isConnected) return;

      sendMessage(newMessage);

      insertChat(chatRef).then((res) => {
        if (res) {
          setNewMessage('');
        }
      });
    },
    [userId?.id, newMessage, isConnected, sendMessage, insertChat],
  );

  // 이미 나눴던 채팅 가져오기
  useEffect(() => {
    getChat(CHAT_ROOM_ID).then((res) => {
      setIntialMessage(res.result);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  useEffect(() => {
    if (sessionStorage.getItem('mentor')) {
      setUserId(JSON.parse(sessionStorage.getItem('mentor') ?? ''));
    } else {
      setUserId(JSON.parse(sessionStorage.getItem('menti') ?? ''));
    }
  }, []);

  return (
    <main className={styles.chat_container}>
      <section className={styles.chat_section}>
        <h1>채팅하기</h1>
        <div ref={containerRef} className={styles.item_container}>
          {allMessages?.map((item, index) => (
            <section className={styles.chat_item} key={item?.content + index}>
              <section className={styles.content_top}>
                <div className={styles.chat_title}>
                  <span className={styles.profile_image}></span>
                  <span className={styles.chat_name}>{item?.memberId === userId?.id ? userId?.name : '익명'}</span>
                  <span className={styles.chat_bedge}>멘토</span>
                </div>
                <p className={styles.date}>{dayjs(item?.createdAt).format('HH:mm')}</p>
              </section>
              <section className={styles.content_bottom}>
                <span className={styles.chat_type}>질문</span>
                <div className={styles.chat_content}>{item?.content}</div>
              </section>
            </section>
          ))}
        </div>

        <div className={styles.chat_enter}>
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="메시지 입력"
            fullWidth
            value={newMessage}
            onChange={(e) => onChangeMessage(e.target.value)}
            onKeyDown={(e) => handleSendMessage(e)}
          />
        </div>
      </section>
    </main>
  );
};

export default ChatPage;
