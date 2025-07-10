import { ChatRepository } from '@/backend/domain/repositories/ChatRepository';
import { ChatRoomDto } from '../../dtos/ChatRoomDto';
import { ChatRoomTable } from '@/backend/domain/tables/ChatRoomTable';

export class GetChatRoomUseCase {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }

  async execute(member_id: string): Promise<{ chatRoom: ChatRoomDto[] }> {
    const chatRoomTable: ChatRoomTable[] = await this.repository.findById(member_id);

    const chatRoomDto: ChatRoomDto[] = chatRoomTable.map((cr) => ({
      id: cr.id,
      createdAt: cr.created_at,
      updatedAt: cr.updated_at,
      deletedAt: cr.deleted_at,
      title: cr.title,
      chatMember: cr.chat_member.map((cm) => ({
        memberId: cm.member_id,
        chatRoomId: cm.chat_room_id,
      })),
      createMember: cr.member,
    }));

    return {
      chatRoom: chatRoomDto,
    };
  }
}
