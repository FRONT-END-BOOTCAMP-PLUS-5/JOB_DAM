export class ChatRoom {
  constructor(
    public id: string,
    public created_at: string,
    public deleted_at: string,
    public updated_at: string,
    public created_member_id: string,
    public descript: string,
    public max_people: number,
    public progress: number,
  ) {}
}
