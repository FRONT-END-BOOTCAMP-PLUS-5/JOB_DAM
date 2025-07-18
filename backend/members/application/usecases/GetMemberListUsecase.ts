import { MemberRepository } from '../../domain/repositories/MemberRepository';
import { MemberMentorRank } from '@/backend/members/domain/entities/MemberMentorRank';
import { MemberMentorRankDto } from '@/backend/members/application/dtos/MemberMentorRankDto';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */
export class GetMemberListUsecase {
  private repository: MemberRepository;

  constructor(repository: MemberRepository) {
    this.repository = repository;
  }

  async execute(): Promise<{ member: MemberMentorRankDto[] }> {
    const members: MemberMentorRank[] = await this.repository.findTopGradeMembers();

    const memberMentorDtos: MemberMentorRankDto[] = members.map((item) => ({
      id: item['id'],
      name: item['name'],
      img: item['img'],
      point: item['point'],
      nickname: item['nickname'],
      member: item['mentor_application']
    }));

    return {
      member: memberMentorDtos,
    };
  }
}
