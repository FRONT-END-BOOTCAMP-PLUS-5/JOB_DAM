import { ChatRepository } from '@/app/(backend)/domain/repositories/ChatRepository';

export class GetChatMemberUseCase {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }
}
