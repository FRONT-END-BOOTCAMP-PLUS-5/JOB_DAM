export class MemberDto {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: string,
    public updatedAt: string | null,
    public img: string | null,
    public nickname: string,
    public grade: number | null,
    public point: number | null,
    public type: number | null,
    public deletedAt: string | null,
  ) {}
}
