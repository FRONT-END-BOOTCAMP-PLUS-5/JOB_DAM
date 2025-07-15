export class QuestionAnswer {
  constructor(
    public id: number,
    public member_id: string,
    public question_id: number,
    public content: string,
    public created_at: string,
    public deleted_at: string,
    public updated_at: string
  ) {}
}
