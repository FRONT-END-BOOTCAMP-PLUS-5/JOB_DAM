export class ReviewInfo {
  constructor(
    public id: number,
    public created_at: string,
    public deleted_at: string,
    public content: string,
    public rating: number,
    public chat_room_id: number,
    public chat_room: {
      id: number;
      title: string;
      member: {
        name: string;
        nickname: string;
      };
      created_at: string;
      description: string;
    },
  ) {}
}
