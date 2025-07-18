import { AlarmChatRoom } from '../../domain/entities/AlarmChatRoom';
import { ChatRoomRepository } from '../../domain/repositories/ChatRoomRepositorys';
import { AlarmChatRoomDto } from '../dtos/AlarmChatRoomDto';

export class GetAlarmChatRoomUseCase {
  private repository: ChatRoomRepository;

  constructor(repository: ChatRoomRepository) {
    this.repository = repository;
  }

  async execute(created_member_id: string): Promise<{ result: AlarmChatRoomDto[] }> {
    const alarms: AlarmChatRoom[] = await this.repository.findByOneChatRoom(created_member_id);

    const alarmsDto: AlarmChatRoomDto[] = alarms.map((item) => ({
      id: item?.id,
      title: item?.title,
      createdAt: item?.created_at,
    }));

    return {
      result: alarmsDto,
    };
  }
}
