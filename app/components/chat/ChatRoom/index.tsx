import { IChatRoom } from '@/app/types/mypage/chat';
import styles from './chatRoom.module.scss';
import { Chip } from '@mui/material';
import { CHAT_ROOM_PROGRESS } from '@/app/constants/chat';
import Image from 'next/image';
import dayjs from 'dayjs';

interface IProps {
  roomData: IChatRoom[];
  onClickChatRoom: (roomData: IChatRoom) => void;
}

const ChatRoom = ({ roomData, onClickChatRoom }: IProps) => {
  return (
    <ul className={styles.chat_room_list}>
      {roomData?.map((item, index) => (
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
  );
};

export default ChatRoom;
