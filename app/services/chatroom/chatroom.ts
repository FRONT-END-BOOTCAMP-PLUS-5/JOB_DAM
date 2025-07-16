import { ChatRoomRef } from '@/app/types/chatroom/chatroom';
import { UpdateChatPointRef } from '@/app/types/mypage/chat';
import axios from 'axios';

export const chatroomService = {
  addChatRoom: async (chatroomData: ChatRoomRef) => {
    const { data, error } = await axios.post(`/api/chatroom`, chatroomData).catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data,
    };
  },

  updatePointMember: async (updatePointRef: UpdateChatPointRef): Promise<{ status: number }> => {
    const { data, error } = await axios
      .put<{ data: number }>(`/api/user/point`, updatePointRef)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return data.status;
  },
};
