'use client';

import { chatService } from '@/app/services/mypage/chat';
import { ChatRoom } from '@/app/types/mypage/chat';
import { useEffect, useState } from 'react';

import styles from './chatPage.module.scss';
import dayjs from 'dayjs';
import ReviewModal from './ReviewModal';
import { reviewService } from '@/app/services/mypage/review';
import { ChatRoomValue } from '@/app/constants/initialValue';
import { createClient } from '@/app/utils/supabase/client';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Button, Chip } from '@mui/material';
import Link from 'next/link';
import { CHAT_ROOM_PROGRESS } from '@/app/constants/chat';
import Spinner from '@/app/components/common/Spinner';
import { toast } from 'react-toastify';

const ChatPage = () => {
  const member = useSelector((state: RootState) => state.login.member);
  const supabase = createClient();

  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [content, setContent] = useState('');
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>(ChatRoomValue);
  const [loading, setLoading] = useState(true);

  const { getChatRoom, updateChatRoom } = chatService;
  const { addReview } = reviewService;

  const reviewReset = () => {
    setContent('');
    setRating(0);
    setSelectChatRoom(ChatRoomValue);
    setReviewOpen(false);
  };

  const handleReviewModalShow = (status: boolean, chatRoomId?: number) => {
    setReviewOpen(status);
    setSelectChatRoom(chatRoom?.filter((item) => item.id === chatRoomId)[0]);

    if (!status) reviewReset();
  };

  const onClickAddReview = async (chatRoomId: number) => {
    const reviewData = {
      chat_room_id: chatRoomId,
      content: content,
      rating: rating || 0,
      member_id: member?.id,
    };

    await addReview(reviewData).then((res) => {
      if (res.status === 200) {
        chatRoomInit(member?.id);
      }
    });

    reviewReset();
  };

  const handleUpdateChatRoom = (chatRoom: ChatRoom) => {
    const updateChatRoomRef = {
      chat_room_id: chatRoom?.id,
      progress: 1,
    };

    setSelectChatRoom(chatRoom);

    updateChatRoom(updateChatRoomRef).then((res) => {
      if (res) {
        chatRoomInit(member?.id);
      }
    });
  };

  const chatRoomInit = (userId: string) => {
    if (!userId) return toast.warning('유저 정보를 불러오지 못했어요');

    getChatRoom(userId).then((res) => {
      setChatRoom(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (member?.id) {
      chatRoomInit(member?.id);
    }
  }, [member]);

  useEffect(() => {
    const channel = supabase.channel('mypage_chat_room');

    channel
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_room',
        },
        () => {
          chatRoomInit(member?.id);
        },
      )
      .subscribe(async (status) => {
        console.log('mypage_chat_room-status', status);

        if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          channel.unsubscribe().then(() => {
            supabase.channel(`mypage_chat_room`).subscribe((status) => {
              console.log('mypage_chat_room-retry', status);
            });
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, member]);

  return (
    <section>
      {loading && <Spinner />}

      {!loading && chatRoom?.length === 0 && member?.type === 0 && (
        <section className={styles.none_chat_section}>
          <p>채팅중인 방이 없습니다. </p>
          <p>멘토에게 채팅 신청을 해보세요!</p>
          <Button variant="contained" href={'/mentor'}>
            채팅하러 가기!
          </Button>
        </section>
      )}

      {!loading && chatRoom?.length === 0 && member?.type === 1 && (
        <section className={styles.none_chat_section}>
          <p>채팅중인 방이 없습니다.</p>
          <p>멘티에게 어필할 만한 활동을 해보세요!</p>
        </section>
      )}
      <ul className={styles.chat_room_ul}>
        {!loading &&
          chatRoom?.length > 0 &&
          chatRoom?.map((item, index) => (
            <li className={styles.chat_room} key={item.title + index}>
              <p className={styles.mentor_image}>
                <Image src={item?.createMember?.img} alt="프로필 이미지" fill />
              </p>
              <div className={styles.chat_room_info}>
                <hgroup>
                  <Chip
                    label={CHAT_ROOM_PROGRESS[item?.progress]}
                    color={item?.progress === 0 ? 'warning' : item?.progress === 1 ? 'primary' : 'default'}
                  />
                  <span className={styles.title}>{item?.title}</span>
                  <span className={styles.member_num}>
                    ({item?.chatMember.length}/{item?.maxPeople})
                  </span>
                </hgroup>
                <span className={styles.mentor_name}>
                  <Chip label="멘토" variant="filled" color="secondary" /> {item?.createMember?.name}
                </span>
                <span className={styles.created_date}>{dayjs(item?.createdAt).format('YYYY.MM.DD')}</span>
              </div>
              {item?.progress === 0 && item?.createMember.id === member?.id && (
                <div className={styles.button_wrap}>
                  <button onClick={() => handleUpdateChatRoom(item)}>생성하기</button>
                </div>
              )}

              {item?.progress === 1 && (
                <Link
                  href={{
                    pathname: '/chat',
                    query: {
                      id: item?.id,
                    },
                  }}
                >
                  <Button variant="contained">이동하기</Button>
                </Link>
              )}

              {item?.progress === 2 &&
                item?.createMember.id !== member?.id &&
                item?.review?.filter((item) => member?.id === item?.memberId).length === 0 && (
                  <Button variant="contained" onClick={() => handleReviewModalShow(true, item?.id)}>
                    리뷰쓰기
                  </Button>
                )}
            </li>
          ))}
      </ul>

      <ReviewModal
        chatRoomInfo={selectChatRoom}
        content={content}
        rating={rating}
        reviewOpen={reviewOpen}
        setRating={setRating}
        setContent={setContent}
        handleModalShow={handleReviewModalShow}
        onClickAddReview={onClickAddReview}
      />
    </section>
  );
};

export default ChatPage;
