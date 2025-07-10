import { ChatRoom } from '../entities/ChatRoom';

export interface ChatRepository {
  findById(member_id: string): Promise<ChatRoom[]>;
}
