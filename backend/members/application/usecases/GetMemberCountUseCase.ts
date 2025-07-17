import { MemberNumDto } from '../dtos/MemberNumDto'
import { MemberNum } from '../../domain/entities/MemberNum';
import { MemberCountRepository } from '../../repositories/MemberCountRepository';

export class GetMemberCountUseCase {
    private repository: MemberCountRepository;

    constructor(repository: MemberCountRepository) {
        this.repository = repository
    }

    async execute(): Promise<{result:MemberNumDto[]}> {
        const memberNumTable: MemberNum[] = await this.repository.findMemberNumData();

        const MemberNDto: MemberNumDto[] = memberNumTable.map((m)=>({
            id: m.id
        }));

        return {
            result:MemberNDto
        }
    }
}