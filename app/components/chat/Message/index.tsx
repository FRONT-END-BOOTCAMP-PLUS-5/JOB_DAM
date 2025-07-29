'use client';

import Image from 'next/image';
import styles from './message.module.scss';
import { Button, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { IChat, IChatRoom, IMatchChatMember } from '@/app/types/mypage/chat';

interface IProps {
  chatData: IChat;
  memberId: string;
  matchChatMember: IMatchChatMember;
  selectChatRoom: IChatRoom;
  setChatType: () => void;
}

const Message = ({ chatData, memberId, matchChatMember, selectChatRoom, setChatType }: IProps) => {
  return (
    <section
      key={chatData?.content}
      className={`${styles.chat_item} ${chatData?.memberId === memberId && styles.my_chat}`}
    >
      <section className={styles.content_top}>
        <div className={styles.chat_title}>
          <span className={styles.profile_image}>
            <Image src={matchChatMember[chatData?.memberId]?.img ?? ''} alt="프로필 이미지" fill />
          </span>
          <span className={styles.chat_name}>{matchChatMember[chatData?.memberId]?.name}</span>
          {selectChatRoom?.createMember?.id === chatData?.memberId && <span className={styles.chat_bedge}>멘토</span>}
        </div>
        <p className={styles.date}>{dayjs(chatData?.createdAt).format('MM.DD / HH:mm')}</p>
      </section>
      <section className={styles.content_bottom}>
        <div className={styles.content_bottom_title}>
          {chatData?.type === 1 && <Chip label="질문" color="primary" variant="filled" />}
          {chatData?.type === 2 && <Chip label="답변" color="primary" variant="filled" />}
          {chatData?.type === 1 && selectChatRoom?.createMember?.id === memberId && (
            <Button color="secondary" onClick={setChatType}>
              답변하기
            </Button>
          )}
        </div>
        <div className={styles.chat_content}>{chatData?.content}</div>
      </section>
    </section>
  );
};

export default Message;
