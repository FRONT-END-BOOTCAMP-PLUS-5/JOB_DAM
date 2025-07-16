'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { Chat, ChatRoom, UpdateChatPointRef } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Member } from '../store/isLogin/loginSlice';
import { Button, Chip, Switch, TextField } from '@mui/material';
import { useChatScroll } from '../hooks/useChatScroll';
import { useRealtimeChat } from '../hooks/useRealTimeChat';
import ChatEndModal from '../components/chat/ChatEndModal';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChatRoomValue } from '../constants/initialValue';
import { CHAT_ROOM_PROGRESS, CHAT_TYPE_TEXT } from '../constants/chat';
import { chatroomService } from '../services/chatroom/chatroom';

const ChatPage = () => {
  const member = useSelector((state: RootState) => state.login.member);
  const param = useSearchParams();

  const [user, setUser] = useState<Member>(member);
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [chatType, setChatType] = useState<0 | 1 | 2>(0);
  const [chatMembers, setChatMembers] = useState<{ [key: string]: { name: string; img?: string } }>({});
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>();
  const [modalOpen, setModalOpen] = useState(false);

  const { getChatRoom, insertChat, updateChatRoom, getChat } = chatService;
  const { updatePointMember } = chatroomService;
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

  const handleUpdatePoint = async () => {
    if (!selectChatRoom) return;

    const updateRef: UpdateChatPointRef = {
      member_id: selectChatRoom?.createMember?.id,
      point: 100,
    };

    await updatePointMember(updateRef);
  };

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

      if (chatType === 2) {
        handleUpdatePoint();
      }

      setChatType(0);

      insertChat(chatRef).then((res) => {
        if (res) {
          setNewMessage('');
        }
      });
    },
    [chatType, insertChat, isConnected, newMessage, selectChatRoom?.id, sendMessage, updatePointMember, user?.id],
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
      if (res.status === 200) {
        initChatRoom(user?.id);
        setSelectChatRoom(ChatRoomValue);
        setChatMembers({});
      }
    });

    setModalOpen(false);
  };

  const onClickChatRoom = (chatRoomData: ChatRoom) => {
    setSelectChatRoom(chatRoomData);

    chatRoomData?.chatMember.forEach((item) =>
      setChatMembers((prev) => ({ ...prev, [item.member.id]: { name: item?.member.name, img: item?.member?.img } })),
    );

    getChat(chatRoomData?.id).then((res) => {
      setIntialMessage(res.result);
    });
  };

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessage, ...realtimeMessages];

    const sortedMessages = mergedMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    return sortedMessages;
  }, [initialMessage, realtimeMessages]);

  const initChatRoom = (memberId: string) => {
    getChatRoom(memberId).then((res) => {
      if (res) {
        // 현재 진행중인 채팅방 filter
        const progressFilter = res.filter((item) => item?.progress !== 0);
        setChatRoom(progressFilter);

        // param에 id가 있으면 채팅방 셋팅
        if (progressFilter.length > 0 && param.get('id')) {
          const paramFilter = progressFilter.filter((v) => v.id === Number(param.get('id')))[0];

          onClickChatRoom(paramFilter);
        }
      }
    });
  };

  // 유저 정보 셋팅
  useEffect(() => {
    setUser(member);

    if (member.id) {
      initChatRoom(member.id);
    }
  }, [member]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  return (
    <main className={styles.chat_container}>
      <section className={styles.content_wrap}>
        <ul className={styles.chat_room_list}>
          {(!chatRoom || chatRoom.length === 0) && (
            <div className={styles.not_found_data}>
              <h3>진행중인 채팅이 없어요. </h3>
              <h4>멘토에게 채팅 신청을 하고 채팅방을 생성해보세요. </h4>
              <Button className={styles.mentor_move_button} variant="contained" href={'/mentor'}>
                멘토 찾으러가기
              </Button>
            </div>
          )}
          {chatRoom &&
            chatRoom.length > 0 &&
            chatRoom?.map((item, index) => (
              <li key={item?.title + item?.id + index} className={styles.chat_room_item}>
                <button onClick={() => onClickChatRoom(item)}>
                  <span className={styles.profile_image}>
                    <Image src={item?.createMember?.img} alt="프로필 이미지" fill />
                  </span>
                  <div className={styles.chat_room_title}>
                    <span className={styles.title}>
                      <Chip
                        variant="filled"
                        label={CHAT_ROOM_PROGRESS[item?.progress]}
                        color={item?.progress === 1 ? 'primary' : 'default'}
                      />
                      {item?.title}
                    </span>
                    <span className={styles.mentor_name}>
                      <Chip variant="filled" label="멘토" color="secondary" />
                      {item?.createMember?.name}
                    </span>
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
          {chatRoom.length > 0 && (!selectChatRoom || selectChatRoom?.id === 0) && (
            <div className={styles.not_select_chatRoom}>
              <p>왼쪽에서 원하는 채팅방을 선택해주세요.</p>
            </div>
          )}
          {selectChatRoom && selectChatRoom?.id !== 0 && (
            <>
              <hgroup className={styles.section_title}>
                <Chip className={styles.right_chat_room_title} variant="filled" label={selectChatRoom?.title} />
                {selectChatRoom?.createMember?.id !== user?.id && selectChatRoom?.progress !== 2 && (
                  <Button variant="contained" color="warning" onClick={() => setModalOpen(true)}>
                    종료하기
                  </Button>
                )}
              </hgroup>
              <div ref={containerRef} className={styles.item_container}>
                {allMessages?.map((item, index) => {
                  return (
                    <section
                      key={item?.content + index}
                      className={`${styles.chat_item} ${item?.memberId === user?.id && styles.my_chat}`}
                    >
                      <section className={styles.content_top}>
                        <div className={styles.chat_title}>
                          <span className={styles.profile_image}>
                            <Image src={chatMembers[item?.memberId]?.img ?? ''} alt="프로필 이미지" fill />
                          </span>
                          <span className={styles.chat_name}>{chatMembers[item?.memberId]?.name}</span>
                          {selectChatRoom?.createMember?.id === item?.memberId && (
                            <span className={styles.chat_bedge}>멘토</span>
                          )}
                        </div>
                        <p className={styles.date}>{dayjs(item?.createdAt).format('MM.DD / HH:mm')}</p>
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
                  );
                })}
              </div>

              {selectChatRoom?.progress !== 2 && (
                <div className={styles.chat_enter}>
                  <section>
                    <Chip
                      label={CHAT_TYPE_TEXT[chatType]}
                      variant="outlined"
                      color={`${chatType !== 0 ? 'primary' : 'default'}`}
                    />

                    {selectChatRoom?.createMember?.id !== user?.id && (
                      <Switch
                        aria-label="Switch"
                        checked={chatType === 1 ? true : false}
                        onChange={(e) => setChatType(e.target.checked ? 1 : 0)}
                      />
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
              )}
            </>
          )}
        </section>
      </section>
      <ChatEndModal
        modalOpen={modalOpen}
        onClickApprove={handleUpdateChatRoom}
        onCloseModal={() => setModalOpen(false)}
      />
    </main>
  );
};

export default ChatPage;
