import { ChatMember } from '../entities/ChatMember';

export interface ChatRepository {
  findById(member_id: string): Promise<ChatMember[]>;
}
