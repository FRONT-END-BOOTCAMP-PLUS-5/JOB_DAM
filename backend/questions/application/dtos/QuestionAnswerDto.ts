export class QuestionAnswerDto {
  constructor(
    public id: number,
    public memberId: {
      id: string
      name: string
      nickname: string
      img: string
    },
    public questionId: number,
    public content: string,
    public createdAt: string,
    public deletedAt: string,
    public updatedAt: string
  ) {}

}
