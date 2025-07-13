import { ChatRoomRepository } from '../../domain/repositories/ChatRoomRepositorys';

export class UpdateChatRoomUseCase {
  private repository: ChatRoomRepository;

  constructor(repository: ChatRoomRepository) {
    this.repository = repository;
  }

  async update(chat_room_id: number, progress: number) {
    await this.repository.updateChatRoom(chat_room_id, progress);
  }
}
