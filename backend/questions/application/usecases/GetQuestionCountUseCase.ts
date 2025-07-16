import { QuestionNumDto } from '../dtos/QuestionNumDto'
import { QuestionNum } from '../../domain/entities/QuestionNum';
import { QuestionCountRepository } from '../../repositories/QuestionCountRepository';

export class GetQuestionCountUseCase {
    private repository: QuestionCountRepository;

    constructor(repository: QuestionCountRepository) {
        this.repository = repository
    }

    async execute(): Promise<{result:QuestionNumDto[]}> {
        const questionNumTable: QuestionNum[] = await this.repository.findQuestionNumData();

        const QuestionNDto: QuestionNumDto[] = questionNumTable.map((m)=>({
            id: m.id
        }));

        return {
            result:QuestionNDto
        }
    }
}