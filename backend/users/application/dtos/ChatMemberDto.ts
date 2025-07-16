export class ChatMemberDto {
  constructor(
    public member: {
      id: string;
      name: string;
      nickname: string;
      img: string;
    },
    public chatRoomId: number,
  ) {}
}
