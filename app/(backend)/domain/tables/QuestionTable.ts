export class QuestionTable {
    constructor(
        public id: number,
        public member_id: string,
        public title: string,
        public content: string,
        public created_at: string,
        public updated_at: string,
        public deleted_at: string,
        public category_id: number,
    ) {}

}
