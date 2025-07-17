import { SupabaseClient } from '@supabase/supabase-js';
import { MRepository } from '../domain/repositories/MRepository';

export class MentorCountRepository implements MRepository {
    private supabase;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async findMentorNumData() {
        const { data, error: mentorNumDataError } = await this.supabase
            .from('mentor_application')
            .select('member_id');
        if (mentorNumDataError) throw new Error(mentorNumDataError.message);

        const mentorIds = data.map((m) => m.member_id);

        return mentorIds;
    }
}