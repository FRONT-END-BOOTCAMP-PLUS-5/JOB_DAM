import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRoomRepository {
  insertChatRoom(): Promise<ChatRoom>;
}
