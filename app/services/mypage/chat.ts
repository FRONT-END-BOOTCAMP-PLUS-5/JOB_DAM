import { ChatRoom } from '@/app/types/mypage/chat';
import axios from 'axios';

export const chatService = () => {
  const getChatRoom = async (memberId: string) => {
    const { data, error } = await axios.get<{ result: ChatRoom[] }>(`/api/chat?id=${memberId}`).catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.chatRoom,
    };
  };

  return {
    getChatRoom,
  };
};
