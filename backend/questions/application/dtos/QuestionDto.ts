export class QuestionDto {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public createdAt: string,
        public deletedAt: string,
        public updatedAt: string,
        public categoryId: number,
        public recommend: number,
        public view: number,
        public member: {
            id: string,
            name: string | null,
            img: string | null,
            nickname: string | null
        }[],
        public img1?: string,
        public img2?: string,
        public img3?: string,
    ) {}

}
