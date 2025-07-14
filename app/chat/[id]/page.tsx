'use client';

import { useChatScroll } from '@/app/hooks/useChatScroll';
import { useRealtimeChat } from '@/app/hooks/useRealTimeChat';
import { chatService } from '@/app/services/mypage/chat';
import { Member } from '@/app/store/isLogin/loginSlice';
import { RootState } from '@/app/store/store';
import { Chat } from '@/app/types/mypage/chat';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './chatDetail.module.scss';
import { Button, Chip, Switch, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';

const CREATE_MEMBER_ID = '0bd61fbf-71fd-44e1-a590-1e53af363c3c';
const CHAT_TYPE_TEXT = ['일반', '질문', '답변'];

const ChatDetailPage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const router = usePathname();
  const chatRoomId = Number(router?.split('chat/')[1]);
  const [user, setUser] = useState<Member>(member);
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [chatType, setChatType] = useState<0 | 1 | 2>(0);

  const { insertChat, updateChatRoom, getChat } = chatService;
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName: `chat-room-${chatRoomId}`,
    username: user?.name,
    userId: user?.id,
    type: chatType,
  });

  const handleSendMessage = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const chatRef = {
        member_id: user?.id,
        chat_room_id: chatRoomId,
        content: newMessage,
        type: chatType,
      };

      if (e.key !== 'Enter') return;
      if (!isConnected) return;

      sendMessage(newMessage);

      insertChat(chatRef).then((res) => {
        if (res) {
          setNewMessage('');
          setChatType(0);
        }
      });
    },
    [user?.id, chatRoomId, newMessage, chatType, isConnected, sendMessage, insertChat],
  );

  const onChangeMessage = (value: string) => {
    return setNewMessage(value);
  };

  const handleUpdateChatRoom = () => {
    const updateChatRoomRef = {
      chat_room_id: chatRoomId,
      progress: 2,
    };

    updateChatRoom(updateChatRoomRef).then((res) => {
      console.log('updateChatRoom', res);
    });
  };

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessage, ...realtimeMessages];

    const sortedMessages = mergedMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return sortedMessages;
  }, [initialMessage, realtimeMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  // 이미 나눴던 채팅 가져오기
  useEffect(() => {
    getChat(chatRoomId).then((res) => {
      setIntialMessage(res.result);
    });
  }, []);

  useEffect(() => {
    setUser(member);
  }, [member]);

  return (
    <main className={styles.container}>
      <section className={styles.chat_section}>
        <h1 className={styles.section_title}>
          채팅하기
          <Button variant="contained" color="warning" onClick={() => handleUpdateChatRoom()}>
            종료하기
          </Button>
        </h1>
        <div ref={containerRef} className={styles.item_container}>
          {allMessages?.map((item, index) => (
            <section className={styles.chat_item} key={item?.content + index}>
              <section className={styles.content_top}>
                <div className={styles.chat_title}>
                  <span className={styles.profile_image}></span>
                  <span className={styles.chat_name}>{item?.memberId === user?.id ? user?.name : '익명'}</span>
                  {CREATE_MEMBER_ID === item?.memberId && <span className={styles.chat_bedge}>멘토</span>}
                </div>
                <p className={styles.date}>{dayjs(item?.createdAt).format('HH:mm')}</p>
              </section>
              <section className={styles.content_bottom}>
                <div className={styles.content_bottom_title}>
                  {item?.type === 1 && <Chip label="질문" color="primary" variant="filled" />}
                  {item?.type === 2 && <Chip label="답변" color="primary" variant="filled" />}
                  {item?.type === 1 && CREATE_MEMBER_ID === user?.id && (
                    <Button color="secondary" onClick={() => setChatType(2)}>
                      답변하기
                    </Button>
                  )}
                </div>
                <div className={styles.chat_content}>{item?.content}</div>
              </section>
            </section>
          ))}
        </div>

        <div className={styles.chat_enter}>
          <section>
            <Chip
              label={CHAT_TYPE_TEXT[chatType]}
              variant="outlined"
              color={`${chatType !== 0 ? 'primary' : 'default'}`}
            />

            {CREATE_MEMBER_ID !== user?.id && (
              <Switch aria-label="Switch" value={chatType} onChange={(e) => setChatType(e.target.checked ? 1 : 0)} />
            )}
          </section>

          <TextField
            id="outlined-basic"
            className={styles.text_field}
            style={{ border: `1px solid ${chatType === 0 ? '#ddd' : '#667eea'}` }}
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

export default ChatDetailPage;
