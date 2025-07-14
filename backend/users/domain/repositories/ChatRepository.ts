import { Chat } from '../entities/Chat';
import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRepository {
  chatRoomFindById(member_id: string): Promise<ChatRoom[]>;
  insertChat(): Promise<Chat>;
  chatFindById(chat_room_id: number): Promise<Chat[]>;
}
