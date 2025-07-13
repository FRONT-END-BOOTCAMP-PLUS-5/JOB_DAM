import { Review } from '../entities/Review';
import { ReviewInfo } from '../entities/ReviewInfo';

export interface ReviewRepository {
  insertReview(chat_room_id: number): Promise<Review>;
  findById(member_id: string): Promise<ReviewInfo[]>;
}
