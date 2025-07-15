import { ChatRepository } from '@/backend/users/domain/repositories/ChatRepository';
import { ChatRoomDto } from '../dtos/ChatRoomDto';
import { ChatRoom } from '../../domain/entities/ChatRoom';

export class GetChatRoomUseCase {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }

  async execute(member_id: string): Promise<{ chatRoom: ChatRoomDto[] }> {
    const chatRoomTable: ChatRoom[] = await this.repository.chatRoomFindById(member_id);

    const chatRoomDto: ChatRoomDto[] = chatRoomTable.map((cr) => ({
      id: cr.id,
      createdAt: cr.created_at,
      updatedAt: cr.updated_at,
      deletedAt: cr.deleted_at,
      title: cr.title,
      chatMember: cr.chat_member.map((cm) => ({
        member: {
          name: cm.member.name,
          nickname: cm.member.nickname,
        },
        chatRoomId: cm.chat_room_id,
      })),
      createMember: cr.member,
      progress: cr.progress,
      maxPeople: cr.max_people,
    }));

    return {
      chatRoom: chatRoomDto,
    };
  }
}
