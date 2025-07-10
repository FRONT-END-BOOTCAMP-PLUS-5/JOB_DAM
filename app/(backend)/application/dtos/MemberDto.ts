export class MemberDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    // public password: string,
    public createdAt: string,
    public updatedAt: string,
    public img: string,
    public nickname: string,
    public grade: number,
    public point: number,
    public type: number,
    // public deleted_at: string,
  ) {}
}
