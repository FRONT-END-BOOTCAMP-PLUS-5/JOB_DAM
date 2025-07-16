import { MentorNumDto } from '../dtos/MentorNumDto'
import { MentorNum } from '../../domain/entities/MentorNum';
import { MentorCountRepository } from '../../repositories/MentorCountRepository';

export class GetMentorCountUseCase {
    private repository: MentorCountRepository;

    constructor(repository: MentorCountRepository) {
        this.repository = repository
    }

    async execute(): Promise<{result:MentorNumDto[]}> {
        const mentorNumTable: MentorNum[] = await this.repository.findMentorNumData();

        const MentorNDto: MentorNumDto[] = mentorNumTable.map((m)=>({
            member_id: m.member_id
        }));

        return {
            result:MentorNDto
        }
    }
}