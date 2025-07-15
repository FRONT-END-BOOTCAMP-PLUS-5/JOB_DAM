export class ChatMemberDto {
  constructor(
    public member: {
      name: string;
      nickname: string;
    },
    public chatRoomId: number,
  ) {}
}
