import { createClient } from '@/app/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { MemberCountRepository } from '@/backend/members/repositories/MemberCountRepository';
import { GetMemberCountUseCase } from '@/backend/members/application/usecases/GetMemberCountUseCase';

export async function GET() {
    
    const supabase: SupabaseClient = await createClient();
    const memberCRepository = new MemberCountRepository(supabase);
    const getMCount = new GetMemberCountUseCase(memberCRepository);
    const memberCount = await getMCount.execute();
    
    return NextResponse.json(memberCount);
}