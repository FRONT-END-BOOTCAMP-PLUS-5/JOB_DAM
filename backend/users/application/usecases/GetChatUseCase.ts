import { ChatRepository } from '../../domain/repositories/ChatRepository';
import { ChatTable } from '../../domain/table/ChatTable';
import { ChatDto } from '../dtos/ChatDto';

export class GetChatUseCase {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }

  async execute(chat_room_id: number): Promise<{ result: ChatDto[] }> {
    const chatTable: ChatTable[] = await this.repository.chatFindById(chat_room_id);

    const chatDto: ChatDto[] = chatTable.map((c) => ({
      id: c.id,
      content: c.content,
      chatRoomId: c.chat_room_id,
      memberId: c.member_id,
      createdAt: c.created_at,
      deletedAt: c.deleted_at,
      updatedAt: c.updated_at,
    }));

    return {
      result: chatDto,
    };
  }
}
