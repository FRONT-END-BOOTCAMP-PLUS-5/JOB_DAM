import { SupabaseClient } from '@supabase/supabase-js';
import { Member } from '../domain/entities/Member';
import { MemberTable } from '@/app/(backend)/domain/tables/MemberTable';
import { MemberRepository } from '@/app/(backend)/domain/repositories/MemberRepository';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */

export class SbMemberRepository implements MemberRepository {
    private supabase

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase
    }


    // 데이터베이스 데이터를 도메인 엔티티로 변환
    private getEntities(member: MemberTable): Member {
        return {...member};
    }

    // not null 기능으로 포인트가 상위 4명만 가져오기
    async findTopGradeMembers(): Promise<Member[]> {
        const { data, error } = await this.supabase
                                          .from('member')
                                          .select(`*`)
                                          .order('grade', { ascending: false  })
                                          .limit(5)

        if (error) throw new Error(error.message);
        return data.map((item) => this.getEntities(item)) as Member[];
    }
}
