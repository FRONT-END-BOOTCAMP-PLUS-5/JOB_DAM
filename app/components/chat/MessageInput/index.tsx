'use client';

import { Chip, Switch, TextField } from '@mui/material';
import styles from './messageInput.module.scss';
import { CHAT_TYPE_TEXT } from '@/app/constants/chat';
import { IChatRoom, IChatType } from '@/app/types/mypage/chat';

interface IProps {
  selectChatRoom: IChatRoom;
  chatType: IChatType;
  memberId: string;
  setChatType: (status: IChatType) => void;
  newMessage: string;
  onChangeMessage: (e: string) => void;
  handleSendMessage: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const MessageInput = ({
  selectChatRoom,
  chatType,
  memberId,
  newMessage,
  setChatType,
  onChangeMessage,
  handleSendMessage,
}: IProps) => {
  return (
    <div className={styles.chat_enter}>
      <section>
        <Chip label={CHAT_TYPE_TEXT[chatType]} variant="outlined" color={`${chatType !== 0 ? 'primary' : 'default'}`} />

        {selectChatRoom?.createMember?.id !== memberId && (
          <Switch
            aria-label="Switch"
            checked={chatType === 1 ? true : false}
            onChange={(e) => setChatType(e.target.checked ? 1 : 0)}
          />
        )}
      </section>

      <TextField
        id="outlined-basic"
        className={styles.text_field}
        style={{ border: `1px solid ${chatType === 0 ? '#ddd' : '#667eea'}` }}
        label=""
        variant="outlined"
        placeholder="메시지 입력"
        fullWidth
        value={newMessage}
        onChange={(e) => onChangeMessage(e.target.value)}
        onKeyDown={(e) => handleSendMessage(e)}
      />
    </div>
  );
};

export default MessageInput;
