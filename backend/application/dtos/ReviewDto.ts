export class ReviewDto {
  constructor(
    public id: number,
    public createdAt: string,
    public deletedAt: string,
    public content: string,
    public rating: number,
    public chatRoomId: number,
    public chatRoom: {
      id: number;
      title: string;
      member: {
        name: string;
        nickName: string;
      };
      createdAt: string;
      description: string;
    },
  ) {}
}
