'use client'
import style from "./itemModal.module.scss"
import { Modal, Box } from '@mui/material';
import { getImageUrl } from '@/app/utils/storage/storage';
import { Dispatch, SetStateAction } from 'react';

interface IProps{
  isModal: { open: boolean, img: string }
  setIsModal: Dispatch<SetStateAction<{
    open: boolean
    img: string
  }>>
}

export default function BoardItemModal({ isModal, setIsModal }: IProps){
  return (
    <>
    {
      <Modal open={isModal.open} onClose={() => {
        setIsModal({
          ...isModal,
          open: false,
        })
      }}>
        <Box className={style.container}>
          <img className={style.img} src={getImageUrl(isModal.img)} />
        </Box>
      </Modal>
    }
    </>
  );
};