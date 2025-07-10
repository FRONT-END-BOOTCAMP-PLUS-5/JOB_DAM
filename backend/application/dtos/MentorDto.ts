export class MentorDto {
  constructor(
    public memberId: string,
    public company: string,
    public level: string,
    public workPeriod: string,
    public createdAt: string,
    public deletedAt: string,
    public updatedAt: string,
  ) {}
}
