export class MemberTable {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: string,
    public updated_at: string | null,
    public deleted_at: string | null,
    public img: string | null,
    public grade: number,
    public point: number | null,
    public type: number,
    public nickname: string,
  ) {}
}

export class OneMemberTable{
  constructor(
    public id: string,
    public img: string | null,
    public nickname: string,
    public name: string
  ) {}
}