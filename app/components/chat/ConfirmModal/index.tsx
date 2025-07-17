'use client';

import styles from './confirm.module.scss';
import { Button, Modal } from '@mui/material';

interface IProps {
  modalOpen: boolean;
  children: React.ReactNode;
  onClickApprove: () => void;
  onCloseModal: () => void;
  confirmText?: string;
  cancelText?: string;
  cancelButton?: boolean;
}

const ConfirmModal = ({
  children,
  modalOpen,
  confirmText = '확인',
  cancelText = '취소',
  cancelButton = true,
  onClickApprove,
  onCloseModal,
}: IProps) => {
  return (
    <Modal open={modalOpen} onClose={() => onCloseModal()}>
      <section className={styles.content_container}>
        {children}
        <section className={styles.button_section}>
          <Button variant="contained" fullWidth onClick={() => onClickApprove()}>
            {confirmText}
          </Button>
          {cancelButton && (
            <Button variant="outlined" onClick={() => onCloseModal()}>
              {cancelText}
            </Button>
          )}
        </section>
      </section>
    </Modal>
  );
};

export default ConfirmModal;
