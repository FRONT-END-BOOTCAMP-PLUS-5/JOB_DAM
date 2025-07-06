import { QuestionRepository } from '../../../domain/repositories/QuestionRepository';
import { QuestionTable } from '../../../domain/tables/QuestionTable';
import { QuestionDto } from '../../dtos/QuestionDto';
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


        const questionDtos: QuestionDto[] = questions.map((item) => ({
            id: item['id'],
            title: item['title'],
            content: item['content'],
            memberId: item['member_id'],
            createdAt: item['created_at'],
            updatedAt: item['updated_at'],
            deletedAt: item['deleted_at'],
            categoryId: item['category_id'],
            recommend: item['recommend']
        }));

        return {
            question: questionDtos,
        };
    }

}
