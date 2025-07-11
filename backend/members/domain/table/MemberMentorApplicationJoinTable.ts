export class MemberMentorApplicationJoinTable {
  constructor(
    public id: string,
    public name: string,
    public img: string | null,
    public grade: number,
    public nickname: string,
    public mentor_application: {
      company: string,
      level: string
    }[],
  ){}
}
