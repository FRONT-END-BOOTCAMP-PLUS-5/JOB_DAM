import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { MemberCountRepository } from '@/backend/members/repositories/MemberCountRepository';
import { GetMemberCountUseCase } from '@/backend/members/application/usecases/GetMemberCountUseCase';

export async function GET() {
    
    const supabase: SupabaseClient = await createClient();
    const membersCountRepository = new MemberCountRepository(supabase);
    const getMemberCount = new GetMemberCountUseCase(membersCountRepository);
    const memberCount = await getMemberCount.execute();
    
    return NextResponse.json(memberCount);
}