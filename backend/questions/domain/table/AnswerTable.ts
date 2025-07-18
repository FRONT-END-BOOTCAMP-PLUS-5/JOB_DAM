export class AnswerTable {
  constructor(
    public id: number,
    public member_id: {
      id: string
      name: string,
      nickname: string
      img: string
    },
    public question_id: number,
    public content: string,
    public created_at: string,
    public deleted_at: string,
    public updated_at: string,
  ){}

}

