import { ChatRoomRef } from '@/app/types/chatroom/chatroom';
import axios from 'axios';

export const chatroomService = {
  addChatRoom: async (chatroomData: ChatRoomRef) => {
    const { data, error } = await axios.post(`/api/chatroom`, chatroomData).catch((error) => error);

    if (error) throw new Error(error.message);

    console.log('data', data);

    return {
      result: data,
    };
  },
};
