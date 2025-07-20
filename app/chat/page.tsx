'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './chat.module.scss';
import { chatService } from '../services/mypage/chat';
import { Chat, ChatRoom, UpdateChatPointRef } from '../types/mypage/chat';
import dayjs from 'dayjs';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Button, Chip, Switch, TextField } from '@mui/material';
import { useChatScroll } from '../hooks/useChatScroll';
import { useRealtimeChat } from '../hooks/useRealTimeChat';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChatRoomValue } from '../constants/initialValue';
import { CHAT_ROOM_PROGRESS, CHAT_TYPE_TEXT } from '../constants/chat';
import { chatroomService } from '../services/chatroom/chatroom';
import Spinner from '../components/common/Spinner';
import { createClient } from '../utils/supabase/client';
import ConfirmModal from '../components/chat/ConfirmModal';

const ChatPage = () => {
  const member = useSelector((state: RootState) => state.login.member);
  const param = useSearchParams();
  const supabase = createClient();
  const router = useRouter();

  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [initialMessage, setIntialMessage] = useState<Chat[]>([]);
  const [chatType, setChatType] = useState<0 | 1 | 2>(0);
  const [chatMembers, setChatMembers] = useState<{ [key: string]: { name: string; img?: string } }>({});
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>(ChatRoomValue);
  const [chatEndModal, setChatEndModal] = useState(false);
  const [chatRoomLoading, setChatRoomLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatRoomName, setChatRoomName] = useState('');
  const [reviewMoveModal, setReviewMoveModal] = useState(false);
  const [prevChatTiem, setPrevChatTime] = useState(0);

  const { getChatRoom, insertChat, updateChatRoom, getChat } = chatService;
  const { updatePointMember } = chatroomService;
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName: chatRoomName,
    username: member?.name,
    userId: member?.id,
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
      if (selectChatRoom?.progress === 2) return initChatRoom(member?.id);

      const chatRef = {
        member_id: member?.id,
        chat_room_id: selectChatRoom?.id,
        content: newMessage,
        type: chatType,
      };

      if (e.key !== 'Enter') return;
      if (!isConnected) return;

      setPrevChatTime(new Date().getTime());
      const nowChatTime = new Date().getTime();

      if (nowChatTime - prevChatTiem < 200) {
        console.log('오류 메시지');
        return;
      }

      sendMessage(newMessage);

      if (chatType === 2) {
        handleUpdatePoint();
      }

      setChatType(0);

      insertChat(chatRef).then((res) => {
        if (res) {
          setNewMessage('');
          setChatType(0);
        }
      });
    },

    [
      chatType,
      insertChat,
      isConnected,
      newMessage,
      prevChatTiem,
      selectChatRoom?.id,
      sendMessage,
      updatePointMember,
      member?.id,
    ],
  );

  const onChangeMessage = (value: string) => {
    return setNewMessage(value);
  };

  const endUpdateChatRoom = () => {
    if (!selectChatRoom?.id) return;

    const updateChatRoomRef = {
      chat_room_id: selectChatRoom?.id,
      progress: 2,
    };

    updateChatRoom(updateChatRoomRef).then((res) => {
      if (res.status === 200) {
        initChatRoom(member?.id);
        setSelectChatRoom(ChatRoomValue);
        setChatMembers({});
        setReviewMoveModal(true);
      }
    });

    setChatEndModal(false);
  };

  const onClickChatRoom = (chatRoomData: ChatRoom) => {
    setChatLoading(true);
    setSelectChatRoom(chatRoomData);
    setChatRoomName(`chat-room-${chatRoomData?.id}`);

    chatRoomData?.chatMember.forEach((item) =>
      setChatMembers((prev) => ({ ...prev, [item.member.id]: { name: item?.member.name, img: item?.member?.img } })),
    );

    getChat(chatRoomData?.id).then((res) => {
      setIntialMessage(res.result);
      setChatLoading(false);
    });
  };

  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessage, ...realtimeMessages];

    return mergedMessages;
  }, [initialMessage, realtimeMessages]);

  const initChatRoom = async (memberId: string) => {
    await getChatRoom(memberId).then((res) => {
      if (res) {
        if (res.length === 0) return;
        // 현재 진행중인 채팅방 filter
        const progressFilter = res.filter((item) => item?.progress !== 0);
        setChatRoom(progressFilter);
        onClickChatRoom(progressFilter[0]);
        setChatRoomName(`chat-room-${progressFilter[0].id}`);

        // param에 id가 있으면 채팅방 셋팅
        if (progressFilter.length > 0 && param.get('id')) {
          const paramFilter = progressFilter.filter((v) => v.id === Number(param.get('id')))[0];

          onClickChatRoom(paramFilter);
          setChatRoomName(`chat-room-${paramFilter.id}`);
        }
      }
    });

    setChatRoomLoading(false);
  };

  const handelReviewMove = () => {
    router.push('/mypage/chat');
    setReviewMoveModal(false);
  };

  // 유저 정보 셋팅
  useEffect(() => {
    if (member.id) {
      initChatRoom(member.id);
    }
  }, [member]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  useEffect(() => {
    const channel = supabase.channel(`end_chat_room`);

    channel
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_room',
        },
        () => {
          initChatRoom(member?.id);
          setSelectChatRoom(ChatRoomValue);
        },
      )
      .subscribe(async (status) => {
        console.log('end_chat_room-status', status);

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          channel.unsubscribe().then(() => {
            supabase.channel(`end_chat_room`).subscribe((status) => {
              console.log('end_chat_room-retry', status);
            });
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, chatRoom]);

  return (
    <main className={styles.chat_container}>
      <section className={styles.content_wrap}>
        {!chatRoomLoading && (!chatRoom || chatRoom.length === 0) && (
          <section className={styles.not_found_container}>
            <section className={styles.not_found_data}>
              <h3>진행중인 채팅이 없어요. </h3>
              <h4>멘토에게 채팅 신청을 하고 채팅방을 생성해보세요. </h4>
              <Button className={styles.mentor_move_button} variant="contained" href={'/mentor'}>
                멘토 찾으러가기
              </Button>
            </section>
          </section>
        )}

        {chatRoomLoading && <Spinner />}

        {!chatRoomLoading && chatRoom.length > 0 && (
          <ul className={styles.chat_room_list}>
            {chatRoom?.map((item, index) => (
              <li key={item?.title + item?.id + index} className={styles.chat_room_item}>
                <button onClick={() => onClickChatRoom(item)}>
                  <span className={styles.profile_image}>
                    {item?.createMember?.img && <Image src={item?.createMember?.img ?? ''} alt="프로필 이미지" fill />}
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
        )}

        {chatLoading && <Spinner />}
        {!chatLoading && chatRoom.length > 0 && (!selectChatRoom || selectChatRoom?.id === 0) && (
          <div className={styles.not_select_chatRoom}>
            <p>왼쪽에서 원하는 채팅방을 선택해주세요.</p>
          </div>
        )}
        {!chatLoading && selectChatRoom && selectChatRoom?.id !== 0 && (
          <section className={styles.chat_section}>
            <hgroup className={styles.section_title}>
              <Chip className={styles.right_chat_room_title} variant="filled" label={selectChatRoom?.title} />
              {selectChatRoom?.createMember?.id !== member?.id && selectChatRoom?.progress !== 2 && (
                <Button variant="contained" color="warning" onClick={() => setChatEndModal(true)}>
                  종료하기
                </Button>
              )}
            </hgroup>
            <div ref={containerRef} className={styles.item_container}>
              {allMessages?.map((item, index) => {
                return (
                  <section
                    key={item?.content + index}
                    className={`${styles.chat_item} ${item?.memberId === member?.id && styles.my_chat}`}
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
                        {item?.type === 1 && selectChatRoom?.createMember?.id === member?.id && (
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

                  {selectChatRoom?.createMember?.id !== member?.id && (
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
          </section>
        )}
      </section>
      <ConfirmModal
        modalOpen={chatEndModal}
        onClickApprove={endUpdateChatRoom}
        onCloseModal={() => setChatEndModal(false)}
      >
        <h1>채팅을 종료 하시겠습니까?</h1>
      </ConfirmModal>

      <ConfirmModal
        modalOpen={reviewMoveModal}
        confirmText={'작성하러 가기'}
        onClickApprove={handelReviewMove}
        onCloseModal={() => setReviewMoveModal(false)}
      >
        <h1>채팅이 종료되었어요.</h1>
        <h2>이제 리뷰를 작성할수있어요.</h2>
      </ConfirmModal>
    </main>
  );
};

export default ChatPage;
