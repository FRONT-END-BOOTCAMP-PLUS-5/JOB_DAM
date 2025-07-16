export class ChatMember {
  constructor(
    public member: {
      id: string;
      name: string;
      nickname: string;
      img: string;
    },
    public chat_room_id: number,
  ) {}
}
