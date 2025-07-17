import { MemberNum } from '../entities/MemberNum';

export interface MemberCRepository {
    findMemberNumData(): Promise<MemberNum[]>;
}