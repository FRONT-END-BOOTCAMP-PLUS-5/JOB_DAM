export class QuestionLikedQuestionJoinTable {
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
    ){}

}


export class LikedQuestionTable {
    constructor(
        public member_id: string,
        public question_id: number,
        // public created_at 필요할때
        public like_type: boolean
    ){}

}