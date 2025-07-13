'use client';

import { chatService } from '@/app/services/mypage/chat';
import { ChatRoom } from '@/app/types/mypage/chat';
import { useCallback, useEffect, useState } from 'react';

import styles from './chatPage.module.scss';
import dayjs from 'dayjs';
import ReviewModal from './ReviewModal';
import { reviewService } from '@/app/services/mypage/review';
import { ChatRoomValue } from '@/app/constants/initialValue';
import { createClient } from '@/app/utils/supabase/client';

const TEST_USER_ID = '0bd61fbf-71fd-44e1-a590-1e53af363c3c';

const ChatPage = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [content, setContent] = useState('');
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>(ChatRoomValue);
  const [progress, setProgress] = useState(0);

  const supabase = createClient();
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
    };

    const result = await addReview(reviewData);

    if (result) reviewReset();
  };

  const handleUpdateChatRoom = (chatRoomId: number) => {
    const updateChatRoomRef = {
      chat_room_id: chatRoomId,
      progress: 1,
    };

    updateChatRoom(updateChatRoomRef).then((res) => {
      if (res) {
        getChatRoom(TEST_USER_ID).then((gRes) => {
          setChatRoom(gRes.result);
        });
      }
    });
  };

  const updateChatRoomProgress = useCallback(
    (progress: number) => {
      setChatRoom(chatRoom?.map((item) => (item.id === 43 ? { ...item, progress: progress } : item)));
    },
    [chatRoom],
  );

  useEffect(() => {
    updateChatRoomProgress(progress);
  }, [progress]);

  useEffect(() => {
    const channel = supabase.channel('chat_room');

    channel
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'chat_room', filter: `id=in.(${43})` },
        (payload) => {
          setProgress(payload.new.progress);
        },
      )
      .subscribe();
  }, [supabase]);

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
            {item?.progress === 0 && (
              <div className={styles.button_wrap}>
                <button onClick={() => handleUpdateChatRoom(item?.id)}>생성하기</button>
              </div>
            )}
            {item?.progress === 1 && <div>진행중</div>}
            {item?.progress === 2 && (
              <div className={styles.button_wrap}>
                <button onClick={() => handleReviewModalShow(true, item?.id)}>리뷰 쓰기</button>
              </div>
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
