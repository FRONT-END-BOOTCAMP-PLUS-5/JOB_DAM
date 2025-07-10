import { SupabaseClient } from '@supabase/supabase-js';
import { Review } from '../domain/entities/Review';
import { ReviewRepository } from '../domain/repositories/ReviewRepository';
import { TEST_MENTOR_ID } from '@/app/constants/test';
import { ReviewInfo } from '../domain/entities/ReviewInfo';

interface ClientProp {
  content: string;
  rating: number;
  chat_room_id: number;
}

const REVIEW_TABLE_NAME = 'review';

export class SbReviewRepository implements ReviewRepository {
  private supabase;
  private clientData;

  constructor(supabase: SupabaseClient, clientData?: ClientProp) {
    this.supabase = supabase;
    this.clientData = clientData;
  }

  async insertReview(): Promise<Review> {
    const { data, error } = await this.supabase.from(REVIEW_TABLE_NAME).insert(this.clientData).select('*').single();

    if (error) throw new Error(error.message);
    return data as Review;
  }

  async findById(member_id: string): Promise<ReviewInfo[]> {
    const { data: chatMembers, error: chatMemberError } = await this.supabase
      .from('chat_member')
      .select('chat_room_id')
      .eq('member_id', member_id);

    if (chatMemberError) throw new Error(chatMemberError.message);

    const chatRoomIds = chatMembers.map((cm) => cm.chat_room_id);

    const { data: reviews, error } = await this.supabase
      .from(REVIEW_TABLE_NAME)
      .select(`*,chat_room(id, title, created_at, description,member:created_member_id(name,nickname))`)
      .in('chat_room_id', chatRoomIds);

    if (error) throw new Error(error.message);

    return reviews;
  }
}
