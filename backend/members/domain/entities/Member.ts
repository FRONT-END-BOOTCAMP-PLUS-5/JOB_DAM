export class Member {
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
    public point: number,
    public type: number,
    public nickname: string,
  ) {}
}


export class User{
  constructor(
    public id: string,
    public nickname: string,
    public img: string,
    public name: string
  ) {}
}