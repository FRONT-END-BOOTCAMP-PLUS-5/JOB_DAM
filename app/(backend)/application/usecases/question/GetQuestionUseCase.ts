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
            createdAt: item['created_at'],
            categoryId: item['category_id'],
            updatedAt: item['updated_at'],
            deletedAt: item['deleted_at'],
            recommend: item['recommend'],
            view: item['view'],
            member: item['member_id']
        }));

        return {
            question: questionDtos,
        };
    }

}
