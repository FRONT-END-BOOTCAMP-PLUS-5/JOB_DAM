import { MentorNum } from '../entities/MentorNum';

export interface MRepository {
    findMentorNumData(): Promise<MentorNum[]>;
}