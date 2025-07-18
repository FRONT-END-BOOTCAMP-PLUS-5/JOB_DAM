export class MemberMentorRankDto {
  constructor(
    public id: string,
    public name: string,
    public img: string | null,
    public point: number,
    public nickname: string,
    public member: {
      company: string,
      level: string
    }[],
  ){}
}