export class QuestionTable {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public category_id: number,
        public like_num: number,
        public dislike_num: number,
        public view: number,
        public member_id: {
            id: string,
            name: string | null,
            img: string | null,
            nickname: string | null,
        }[],
        public img1?: string,
        public img2?: string,
        public img3?: string,
    ){}

}

