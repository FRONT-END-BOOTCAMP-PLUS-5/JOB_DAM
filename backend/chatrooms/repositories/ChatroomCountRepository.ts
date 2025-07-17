import { SupabaseClient } from '@supabase/supabase-js';
import { CRepository } from '../domain/repositories/CRepository';

export class ChatroomCountRepository implements CRepository {
    private supabase;

    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    async findMentorRoomNumData() {
        const { data, error: mentorRoomNumDataError } = await this.supabase
            .from('chat_room')
            .select('id');
        if(mentorRoomNumDataError) throw new Error(mentorRoomNumDataError.message);

        const mentorRoomIds = data.map((r) => r.id);

        return mentorRoomIds;
    }
}