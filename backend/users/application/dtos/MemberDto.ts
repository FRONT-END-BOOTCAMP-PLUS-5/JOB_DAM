export class MemberDto {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: string,
    public updatedAt: string | null,
    public deletedAt: string | null,
    public img: string | null,
    public grade: number,
    public point: number | null,
    public type: number
  ) {}

}
