import { Chat } from '../../domain/entities/Chat';
import { ChatRepository } from '../../domain/repositories/ChatRepository';

export class CreateChatUseCase {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }

  async create(): Promise<{ mentor: string }> {
    const mentor: Chat = await this.repository.insertChat();

    const success = mentor ? 'success' : 'fail';

    return {
      mentor: success,
    };
  }
}
