export class MemberMentorRank {
  constructor(
    public id: string,
    public name: string,
    public img: string | null,
    public point: number,
    public nickname: string,
    public mentor_application: {
      company: string,
      level: string
    }[],
  ){}
}
