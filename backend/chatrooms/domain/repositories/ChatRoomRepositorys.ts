import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRoomRepository {
  insertChatRoom(): Promise<ChatRoom>;
  updateChatRoom(chat_room_id: number, progress: number): void;
}
