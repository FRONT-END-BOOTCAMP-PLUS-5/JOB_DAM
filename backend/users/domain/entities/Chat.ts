export class Chat {
  constructor(
    public id: number,
    public content: string,
    public chat_room_id: number,
    public member_id: string,
    public created_at: string,
    public deleted_at: string,
    public updated_at: string,
  ) {}
}
