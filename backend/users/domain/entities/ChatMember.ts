export class ChatMember {
  constructor(
    public member: {
      name: string;
      nickname: string;
    },
    public chat_room_id: number,
  ) {}
}
