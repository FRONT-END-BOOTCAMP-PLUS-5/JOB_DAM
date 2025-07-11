import { ChatRef, ChatRoom } from '@/app/types/mypage/chat';
import { Chat } from '@/app/types/mypage/chat';
import axios from 'axios';

export const chatService = {
  getChatRoom: async (memberId: string) => {
    const { data, error } = await axios
      .get<{ result: ChatRoom[] }>(`/api/user/room?id=${memberId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.chatRoom,
    };
  },

  insertChat: async (chatData: ChatRef) => {
    const { data, error } = await axios.post(`/api/user/chat`, chatData).catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.chat,
    };
  },

  getChat: async (chatRoomId: number) => {
    const { data, error } = await axios
      .get<{ result: Chat }>(`/api/user/chat?id=${chatRoomId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.result,
    };
  },
};
