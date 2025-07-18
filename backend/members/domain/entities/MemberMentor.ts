export class MemberMentor {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public img: string | null,
    public nickname: string,
    public grade: number,
    public point: number,
    public type: number,
    public mentor_application: {
      company: string;
      level: string;
    }[],
  ) {}
}
