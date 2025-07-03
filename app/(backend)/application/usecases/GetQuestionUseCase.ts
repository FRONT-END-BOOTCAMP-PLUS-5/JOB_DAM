import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { QuestionTable } from '../../domain/tables/QuestionTable';
import { QuestionDto } from '../dtos/QuestionDto';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * */
export class GetQuestionUseCase {
    private repository: QuestionRepository;

    constructor(repository: QuestionRepository) {
        this.repository = repository;
    }

    async execute(): Promise<{ question: QuestionDto[] }> {

        const questions: QuestionTable[] = await this.repository.findAll();


        /**
         * Question table structure
         * id
         * title
         * content
         * createdAt
         * updatedAt
         * deletedAt
         * categoryId
         * */
        const questionDtos: QuestionDto[] = questions.map((item) => ({ ...item }));


        return {
            question: questionDtos,
        };
    }
}
