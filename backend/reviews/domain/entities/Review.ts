export class Review {
  constructor(
    public id: number,
    public created_at: string,
    public deleted_at: string,
    public content: string,
    public rating: number,
    public chat_room_id: number,
    public member_id: string,
  ) {}
}
