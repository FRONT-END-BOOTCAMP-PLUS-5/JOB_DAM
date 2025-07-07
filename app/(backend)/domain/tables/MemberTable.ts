export class MemberTable {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: string,
    public updated_at: string,
    public img: string,
    public nickname: string,
    public grade: number,
    public point: number,
    public type: number,
    public deleted_at: string,
  ) {}
}
