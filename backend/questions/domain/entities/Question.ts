export class Question {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public created_at: string,
        public deleted_at: string,
        public updated_at: string,
        public category_id: number,
        public recommend: number,
        public view: number,
        public member_id: {
            id: string,
            name: string | null,
            img: string | null,
            nickname: string | null
        }[],
    ) {}
}
