export class QuestionDto {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public createdAt: string,
        public deletedAt: string,
        public updatedAt: string,
        public categoryId: number
    ) {}
}
