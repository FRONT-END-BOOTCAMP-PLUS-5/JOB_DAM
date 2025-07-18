export class QuestionLikedQuestion {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public like_num: number,
        public dislike_num: number,
        public liked_question: {
            member_id: string,
            question_id: number,
            like_type: boolean
        }[]
    ) {}

}
