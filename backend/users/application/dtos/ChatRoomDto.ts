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
      name: string;
      email: string;
    },
  ) {}
}
