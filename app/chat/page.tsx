'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { Chat, ChatRoom } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { Button, Chip, Switch, TextField } from '@mui/material';
import { useChatScroll } from '../hooks/useChatScroll';
import { useRealtimeChat } from '../hooks/useRealTimeChat';

const CHAT_ROOM_ID = 43;
const CREATE_MEMBER_ID = '0bd61fbf-71fd-44e1-a590-1e53af363c3c';
const CHAT_TYPE_TEXT = ['일반', '질문', '답변'];

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [userId, setUserId] = useState({ name: '', id: '' });
  const [chatType, setChatType] = useState<0 | 1 | 2>(0);
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);

  const { insertChat, getChat, updateChatRoom, getChatRoom } = chatService;
  const { containerRef, scrollToBottom } = useChatScroll();
  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName: `chat-room-${CHAT_ROOM_ID}`,
    username: userId?.name,
    userId: userId?.id,
    type: chatType,
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
    [userId?.id, newMessage, chatType, isConnected, sendMessage, insertChat],
  );

  const handleUpdateChatRoom = () => {
    const updateChatRoomRef = {
      chat_room_id: CHAT_ROOM_ID,
      progress: 2,
    };

    updateChatRoom(updateChatRoomRef).then((res) => {
      console.log('updateChatRoom', res);
    });
  };

  useEffect(() => {
    if (userId?.id) {
      getChatRoom(userId?.id).then((res) => {
        console.log('res.result', res.result);

        setChatRoom(res.result);
      });
    }
  }, [userId]);

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
      setUserId(sessionStorage.getItem('mentor') && JSON.parse(sessionStorage.getItem('mentor') ?? ''));
    } else {
      setUserId(sessionStorage.getItem('menti') && JSON.parse(sessionStorage.getItem('menti') ?? ''));
    }
  }, []);

  return (
    <main className={styles.chat_container}>
      <section className={styles.content_wrap}>
        <ul className={styles.chat_room_list}>
          {chatRoom &&
            chatRoom?.map((item, index) => (
              <li key={item?.id + index} className={styles.chat_room_item}>
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
              </li>
            ))}
        </ul>

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
                    <span className={styles.chat_name}>{item?.memberId === userId?.id ? userId?.name : '익명'}</span>
                    {CREATE_MEMBER_ID === item?.memberId && <span className={styles.chat_bedge}>멘토</span>}
                  </div>
                  <p className={styles.date}>{dayjs(item?.createdAt).format('HH:mm')}</p>
                </section>
                <section className={styles.content_bottom}>
                  <div className={styles.content_bottom_title}>
                    {item?.type === 1 && <Chip label="질문" color="primary" variant="filled" />}
                    {item?.type === 2 && <Chip label="답변" color="primary" variant="filled" />}
                    {item?.type === 1 && CREATE_MEMBER_ID === userId?.id && (
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

              {CREATE_MEMBER_ID !== userId?.id && (
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
      </section>
    </main>
  );
};

export default ChatPage;
