import { createClient } from '../../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    if (!roomId) {
        return
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('chat_member')
        .select('member_id')
        .eq('chat_room_id', parseInt(roomId))
    const memberIds = data?.map(item => item.member_id) || []
    return Response.json(memberIds)
}