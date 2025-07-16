import { Review } from '@/backend/reviews/domain/entities/Review';
import { ChatMemberDto } from './ChatMemberDto';

export class ChatRoomDto {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public deletedAt: string | null,
    public title: string,
    public chatMember: ChatMemberDto[],
    public createMember: {
      id: string;
      img: string;
      name: string;
      type: number;
      grade: number;
      nickname: string;
    },
    public progress: number,
    public maxPeople: number,
    public review: Review[],
  ) {}
}
