import { MemberRepository } from '../../../domain/repositories/MemberRepository';
import { MemberTable } from '../../../domain/tables/MemberTable';
import { MemberDto } from '../../dtos/MemberDto';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */
export class GetMemberListUsecase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ member: MemberDto[] }> {
    const members: MemberTable[] = await this.repository.findTopGradeMembers();


    const memberDtos: MemberDto[] = members.map((item) => ({
      id: item['id'],
      name: item['name'],
      email: item['email'],
      password: item['password'],
      createdAt: item['created_at'],
      updatedAt: item['updated_at'],
      deletedAt: item['deleted_at'],
      img: item['img'],
      grade: item['grade'],
      point: item['point'],
      type: item['type']
    }));

    return {
      member: memberDtos,
    };
  }

}
