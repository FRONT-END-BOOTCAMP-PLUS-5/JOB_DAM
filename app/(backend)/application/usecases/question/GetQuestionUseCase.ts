import { QuestionRepository } from '../../../domain/repositories/QuestionRepository';
import { QuestionTable } from '../../../domain/tables/QuestionTable';
import { QuestionDto } from '../../dtos/QuestionDto';
import { NextRequest } from 'next/server';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-03
 * 수정일: 2025-07-08
 * */
export class GetQuestionUseCase {
    private repository: QuestionRepository;

    constructor(repository: QuestionRepository) {
        this.repository = repository;
    }

    async execute(request:NextRequest): Promise<{ question: QuestionDto[] }> {
        const queryFirstRegex = /latest|popular=([^&]+)/
        const querySecRegex = /search=(.*)/;

        const firMatch = request['url'].match(queryFirstRegex);
        const secMatch = request['url'].match(querySecRegex);

        const column = firMatch &&firMatch[1] || 'created_at'
        const title = secMatch && decodeURIComponent(secMatch[1]) || ''

        const questions: QuestionTable[] = await this.repository.findAll(title, column);


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
