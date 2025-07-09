'use client';

import { Modal, Rating } from '@mui/material';
import styles from './reviewModal.module.scss';

interface IProps {
  mentorName?: string;
  rating: number | null;
  setRating: (value: number | null) => void;
  content: string;
  setContent: (value: string) => void;
  reviewOpen: boolean;
  handleModalShow: (status: boolean, mentorName?: string) => void;
}

const ReviewModal = ({
  mentorName,
  rating = 0,
  setRating,
  content,
  setContent,
  reviewOpen,
  handleModalShow,
}: IProps) => {
  return (
    <Modal open={reviewOpen} onClose={() => handleModalShow(false)}>
      <section className={styles.review_modal_section}>
        <h2>{mentorName} 멘토님 리뷰 작성</h2>
        <div className={styles.rating_box}>
          <Rating size="large" precision={0.5} value={rating} onChange={(e, value) => setRating(value)} />
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 작성해주세요!" />
        <div className={styles.button_wrap}>
          <button className={styles.approve}>작성완료</button>
          <button className={styles.cancel} onClick={() => handleModalShow(false)}>
            취소
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default ReviewModal;
