import { MentorRoomNum } from '../../domain/entities/MentorRoomNum';

export interface CRepository {
    findMentorRoomNumData(): Promise<MentorRoomNum[]>;
}