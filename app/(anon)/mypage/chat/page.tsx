'use client';

import { TEST_MENTI_ID, TEST_MENTOR_ID } from '@/app/constants/test';
import { chatService } from '@/app/services/mypage/chat';
import { ChatRoom } from '@/app/types/mypage/chat';
import { useEffect, useState } from 'react';

import styles from './chatPage.module.scss';
import dayjs from 'dayjs';
import ReviewModal from './ReviewModal';
import { reviewService } from '@/app/services/mypage/review';
import { ChatRoomValue } from '@/app/constants/initialValue';

const ChatPage = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(0);
  const [content, setContent] = useState('');
  const [selectChatRoom, setSelectChatRoom] = useState<ChatRoom>(ChatRoomValue);

  const { getChatRoom } = chatService;
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

  const onClickAddReview = (chatRoomId: number) => {
    const reviewData = {
      chat_room_id: chatRoomId,
      content: content,
      rating: rating || 0,
    };

    addReview(reviewData).then((res) => {
      reviewReset();
    });
  };

  useEffect(() => {
    getChatRoom(TEST_MENTI_ID).then((res) => {
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
              <button onClick={() => handleReviewModalShow(true, item?.id)}>리뷰 쓰기</button>
            </div>
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
