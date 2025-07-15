'use client';

import styles from './chatEndModal.module.scss';
import { Button, Modal } from '@mui/material';

interface IProps {
  modalOpen: boolean;
  onClickApprove: () => void;
  onCloseModal: () => void;
}

const ChatEndModal = ({ modalOpen, onClickApprove, onCloseModal }: IProps) => {
  return (
    <Modal open={modalOpen} onClose={() => onCloseModal()}>
      <section className={styles.content_container}>
        <h1>채팅을 종료 하시겠습니까 ?</h1>
        <section className={styles.button_section}>
          <Button variant="contained" fullWidth onClick={() => onClickApprove()}>
            확인
          </Button>
          <Button variant="outlined" onClick={() => onCloseModal()}>
            취소
          </Button>
        </section>
      </section>
    </Modal>
  );
};

export default ChatEndModal;
