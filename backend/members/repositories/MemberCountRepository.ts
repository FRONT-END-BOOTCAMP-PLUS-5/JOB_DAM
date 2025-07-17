import { SupabaseClient } from '@supabase/supabase-js';
import { MemberCRepository } from '../domain/repositories/MemberCRepository';

export class MemberCountRepository implements MemberCRepository {
    private supabase;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async findMemberNumData() {
        const { data, error: memberNumDataError } = await this.supabase
            .from('member')
            .select('id');

        if (memberNumDataError) throw new Error(memberNumDataError.message);

        const memberIds = data.map((m) => m.id);

        return memberIds;
    }
}