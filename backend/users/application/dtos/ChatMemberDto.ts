export class ChatMemberDto {
  constructor(
    public member: {
      id: string;
      name: string;
      nickname: string;
    },
    public chatRoomId: number,
  ) {}
}
