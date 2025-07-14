import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')
    const supabase = await createClient()
    const { data: chat_member } = await supabase
        .from('chat_member')
        .select('chat_room_id')
        .eq('member_id', memberId)
    const room_id = chat_member?.map(m => m.chat_room_id) || []
    const { data: room_data } = await supabase
        .from('chat_room')
        .select('id,title,created_member_id,description')
        .in('id', room_id)
    return Response.json(room_data || [])
}