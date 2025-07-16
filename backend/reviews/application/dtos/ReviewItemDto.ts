export class ReviewItemDto {
  constructor(
    public id: number,
    public createdAt: string,
    public deletedAt: string,
    public content: string,
    public rating: number,
    public chatRoomId: number,
    public memberId: string,
  ) {}
}
