export class QuestionAnswer {
  constructor(
    public id: number,
    public member_id: {
      id: string,
      name: string,
      nickname: string
      img: string
    }[],
    public content: string,
    public created_at: string,
  ) {}
}
