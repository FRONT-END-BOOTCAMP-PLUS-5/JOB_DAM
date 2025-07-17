import { QuestionNum } from '../entities/QuestionNum';

export interface QRepository {
    findQuestionNumData(): Promise<QuestionNum[]>;
}