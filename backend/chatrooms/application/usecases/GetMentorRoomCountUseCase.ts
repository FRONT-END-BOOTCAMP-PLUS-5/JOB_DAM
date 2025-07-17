import { MentorRoomNumDto } from '../dtos/MentorRoomNumDto'
import { MentorRoomNum } from '../../domain/entities/MentorRoomNum';
import { ChatroomCountRepository } from '../../repositories/ChatroomCountRepository';

export class GetMentorRoomCountUseCase {
    private repository: ChatroomCountRepository;

    constructor(repository: ChatroomCountRepository) {
        this.repository = repository
    }

    async execute(): Promise<{result:MentorRoomNumDto[]}> {
        const mentorRoomNumTable: MentorRoomNum[] = await this.repository.findMentorRoomNumData();

        const MentorRoomNDto: MentorRoomNumDto[] = mentorRoomNumTable.map((m)=>({
            id: m.id
        }));

        return {
            result:MentorRoomNDto
        }
    }
}