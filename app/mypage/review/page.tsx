'use client';

import Title from '@/app/components/common/Title';
import styles from './review.module.scss';
import { reviewService } from '@/app/services/mypage/review';
import { useEffect, useState } from 'react';
import { Review } from '@/app/types/mypage/review';
import { Rating } from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

const ReviewPage = () => {
  const { getReviews } = reviewService;
  const member = useSelector((state: RootState) => state.login.member);

  const [reviewList, setReviewList] = useState<Review[]>([]);

  useEffect(() => {
    if (member?.id) {
      getReviews(member?.id).then((res) => {
        setReviewList(res.result);
      });
    }
  }, [member]);

  return (
    <section className={styles.section}>
      <Title text="리뷰 보기" />

      {reviewList.length > 0 &&
        reviewList?.map((item, index) => (
          <ul key={item?.content + index} className={styles.review_item}>
            <li className={styles.mentor}>
              <span className={styles.mentor_name}>{item?.chatRoom?.member?.name} 멘토님과의 잡담</span>
              <span className={styles.chat_room_date}>{dayjs(item?.chatRoom?.createdAt).format('YYYY. MM. DD')}</span>
            </li>
            <li className={styles.review_title}>
              <Rating value={item?.rating} readOnly />
              <span className={styles.review_date}>{dayjs(item?.createdAt).format('YYYY. MM. DD')}</span>
            </li>
            <li className={styles.content}>{item?.content}</li>
          </ul>
        ))}
    </section>
  );
};

export default ReviewPage;
