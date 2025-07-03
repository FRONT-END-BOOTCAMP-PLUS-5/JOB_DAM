export class QuestionTable {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public createdAt: string,
        public updatedAt: string,
        public deletedAt: string,
        public categoryId: number
    ) {}
}
