export class LikedQuestion {
    constructor(
       public member_id: string,
       public question_id: number,
       public like_type: boolean
    ) {}
}
