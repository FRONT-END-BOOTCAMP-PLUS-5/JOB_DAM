import { AlarmChatRoom } from '../entities/AlarmChatRoom';
import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRoomRepository {
  insertChatRoom(): Promise<ChatRoom>;
  updateChatRoom(chat_room_id: number, progress: number): void;
  findByOneChatRoom(created_member_id: string): Promise<AlarmChatRoom[]>;
}
