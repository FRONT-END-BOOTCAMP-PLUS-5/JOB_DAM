'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { Chat, ChatRoom } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Member } from '../store/isLogin/loginSlice';
import { Button, Chip, Switch, TextField } from '@mui/material';
import { useChatScroll } from '../hooks/useChatScroll';
import { useRealtimeChat } from '../hooks/useRealTimeChat';

const CREATE_MEMBER_ID = '0bd61fbf-71fd-44e1-a590-1e53af363c3c';
const CHAT_TYPE_TEXT = ['일반', '질문', '답변'];

const ChatPage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [user, setUser] = useState<Member>(member);
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [chatType, setChatType] = useState<0 | 1 | 2>(0);
  const [chatMembers, setChatMembers] = useState<{ [key: string]: string }>({});
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>();

  const { getChatRoom, insertChat, updateChatRoom, getChat } = chatService;
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName: `chat-room-${selectChatRoom?.id}`,
    username: user?.name,
    userId: user?.id,
    type: chatType,
  });

  const handleSendMessage = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!selectChatRoom?.id) return;

      const chatRef = {
        member_id: user?.id,
        chat_room_id: selectChatRoom?.id,
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
    [chatType, insertChat, isConnected, newMessage, selectChatRoom, sendMessage, user?.id],
  );

  const onChangeMessage = (value: string) => {
    return setNewMessage(value);
  };

  const handleUpdateChatRoom = () => {
    if (!selectChatRoom?.id) return;

    const updateChatRoomRef = {
      chat_room_id: selectChatRoom?.id,
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

  // 채팅방 정보 가져오기
  useEffect(() => {
    if (user?.id) {
      getChatRoom(user?.id).then((res) => {
        console.log('res.result', res.result);
        setChatRoom(res.result);
      });
    }
  }, [user]);

  // 유저 정보 셋팅
  useEffect(() => {
    setUser(member);
  }, [member]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  // 채팅 멤버 이름 매칭위해 object 생성
  useEffect(() => {
    if (chatRoom.length > 0) {
      chatRoom
        .filter((cr) => cr.id === selectChatRoom?.id)[0]
        ?.chatMember.forEach((item) => setChatMembers((prev) => ({ ...prev, [item.member.id]: item?.member.name })));
    }
  }, [chatRoom, selectChatRoom]);

  // 이미 나눴던 채팅 가져오기
  useEffect(() => {
    if (selectChatRoom && selectChatRoom?.id !== 0) {
      getChat(selectChatRoom?.id).then((res) => {
        setIntialMessage(res.result);
      });
    }
  }, [selectChatRoom]);

  return (
    <main className={styles.chat_container}>
      <section className={styles.content_wrap}>
        <ul className={styles.chat_room_list}>
          {chatRoom &&
            chatRoom?.map((item, index) => (
              <li key={item?.id + index} className={styles.chat_room_item}>
                <button onClick={() => setSelectChatRoom(item)}>
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
                </button>
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
                    <span className={styles.chat_name}>{chatMembers[item?.memberId]}</span>
                    {CREATE_MEMBER_ID === item?.memberId && <span className={styles.chat_bedge}>멘토</span>}
                  </div>
                  <p className={styles.date}>{dayjs(item?.createdAt).format('HH:mm')}</p>
                </section>
                <section className={styles.content_bottom}>
                  <div className={styles.content_bottom_title}>
                    {item?.type === 1 && <Chip label="질문" color="primary" variant="filled" />}
                    {item?.type === 2 && <Chip label="답변" color="primary" variant="filled" />}
                    {item?.type === 1 && selectChatRoom?.createMember?.id === user?.id && (
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
      </section>
    </main>
  );
};

export default ChatPage;
