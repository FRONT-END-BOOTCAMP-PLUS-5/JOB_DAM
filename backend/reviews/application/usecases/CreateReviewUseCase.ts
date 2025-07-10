import { Review } from '@/backend/reviews/domain/entities/Review';
import { ReviewRepository } from '@/backend/reviews/domain/repositories/ReviewRepository';

export class CreateReviewUseCase {
  private repository: ReviewRepository;

  constructor(repository: ReviewRepository) {
    this.repository = repository;
  }

  async create(chatRoomId: number): Promise<{ review: string }> {
    const review: Review = await this.repository.insertReview(chatRoomId);

    const result = review ? 'success' : 'fail';

    return {
      review: result,
    };
  }
}
