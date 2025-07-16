import { Review, ReviewRef } from '@/app/types/mypage/review';
import axios from 'axios';

export const reviewService = {
  getReviews: async (memberId: string) => {
    const { data, error } = await axios
      .get<{ result: Review[] }>(`/api/user/review?id=${memberId}`)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return {
      result: data.result,
    };
  },

  addReview: async (reviewData: ReviewRef): Promise<{ status: number }> => {
    const { data, error } = await axios
      .post<{ status: number }>(`/api/user/review`, reviewData)
      .catch((error) => error);

    if (error) throw new Error(error.message);

    return data;
  },
};
