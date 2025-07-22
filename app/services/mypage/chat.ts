import { UpdateChatRoomRef } from '@/app/types/chatroom/chatroom';

import { IChatRef, IChat, IChatRoom } from '@/app/types/mypage/chat';
import axios from 'axios';

export const chatService = {
  getChatRoom: async (memberId: string): Promise<IChatRoom[]> => {
    const { data, error } = await axios
      .get<{ result: IChatRoom[] }>(`/api/user/room?id=${memberId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return data.chatRoom;
  },

  insertChat: async (chatData: IChatRef) => {
    const { data, error } = await axios.post(`/api/user/chat`, chatData).catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.chat,
    };
  },

  updateChatRoom: async (updateChatRoomRef: UpdateChatRoomRef): Promise<{ status: number }> => {
    const { data, error } = await axios
      .put<{ status: number }>('/api/chatroom', updateChatRoomRef)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return data;
  },

  getChat: async (chatRoomId: number) => {
    const { data, error } = await axios
      .get<{ result: IChat }>(`/api/user/chat?id=${chatRoomId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.result,
    };
  },
};
