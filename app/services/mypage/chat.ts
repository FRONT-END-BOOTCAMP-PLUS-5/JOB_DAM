import { UpdateChatRoomRef } from '@/app/types/chatroom/chatroom';
import { ChatRoom } from '@/app/types/mypage/chat';
import axios from 'axios';

export const chatService = {
  getChatRoom: async (memberId: string) => {
    const { data, error } = await axios
      .get<{ result: ChatRoom[] }>(`/api/user/chat?id=${memberId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.chatRoom,
    };
  },

  updateChatRoom: async (updateChatRoomRef: UpdateChatRoomRef) => {
    const { data, error } = await axios.put('/api/chatroom', updateChatRoomRef).catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data,
    };
  },
};
