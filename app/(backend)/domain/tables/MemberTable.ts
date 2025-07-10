export class MemberTable {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: string,
<<<<<<< HEAD
    public updated_at: string,
    public img: string,
    public nickname: string,
    public grade: number,
    public point: number,
    public type: number,
    public deleted_at: string,
  ) {}
}
=======
    public updated_at: string | null,
    public deleted_at: string | null,
    public img: string | null,
    public grade: number,
    public point: number | null,
    public type: number
  ){}
}

>>>>>>> b73680bfed3e5d71a536ba112f3ac837ce0d6edd
