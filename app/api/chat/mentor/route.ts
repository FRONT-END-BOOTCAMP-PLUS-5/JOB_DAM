import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')
    if (!memberId) {
        return
    }
    const supabase = await createClient()
    const { data: mentor } = await supabase
        .from('mentor_application')
        .select('member_id, company, level')
        .eq('member_id', memberId)
        .single()
    const { data: mentorName } = await supabase
        .from('member')
        .select('name')
        .eq('id', memberId)
        .single()
    return Response.json({
        mentor,
        mentorName
    })
}