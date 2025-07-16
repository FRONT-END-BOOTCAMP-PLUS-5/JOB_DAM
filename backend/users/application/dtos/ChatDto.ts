export class ChatDto {
  constructor(
    public memberId: string,
    public chatRoomId: number,
    public content: string,
    public type: number,
  ) {}
}
