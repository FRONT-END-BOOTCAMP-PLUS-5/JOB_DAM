import { ChatRoom } from '../../domain/entities/ChatRoom';
import { ChatRoomRepository } from '../../domain/repositories/ChatRoomRepositorys';

export class CreateChatRoomUseCase {
  private repository: ChatRoomRepository;

  constructor(repository: ChatRoomRepository) {
    this.repository = repository;
  }

  async create(): Promise<{ result: string }> {
    const result: ChatRoom = await this.repository.insertChatRoom();

    const message = result ? 'success' : 'fail';

    return {
      result: message,
    };
  }
}
