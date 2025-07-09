import { ReviewRepository } from '@/app/(backend)/domain/repositories/ReviewRepository';
import { ReviewDto } from '../../dtos/ReviewDto';
import { ReviewTable } from '@/app/(backend)/domain/tables/ReviewTable';

export class GetReviewUseCase {
  private repository: ReviewRepository;

  constructor(repository: ReviewRepository) {
    this.repository = repository;
  }

  async execute(member_id: string): Promise<{ result: ReviewDto[] }> {
    const reviewTable: ReviewTable[] = await this.repository.findById(member_id);

    const reviewDto: ReviewDto[] = reviewTable.map((r) => ({
      id: r.id,
      chatRoomId: r.chat_room_id,
      content: r.content,
      rating: r.rating,
      createdAt: r.created_at,
      deletedAt: r.deleted_at,
      chatRoom: {
        id: r.chat_room.id,
        title: r.chat_room.title,
        description: r.chat_room.description,
        member: {
          name: r.chat_room.member.name,
          nickName: r.chat_room.member.nickname,
        },
        createdAt: r.chat_room.created_at,
      },
    }));

    return {
      result: reviewDto,
    };
  }
}
