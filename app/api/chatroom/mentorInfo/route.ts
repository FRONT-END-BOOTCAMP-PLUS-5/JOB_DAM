import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const roomIds = searchParams.get('roomIds')
    if (!roomIds) {
        return
    }
    const roomIdArray = roomIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    const supabase = await createClient()
    const { data: rooms } = await supabase
        .from('chat_room')
        .select('id,title,created_member_id,description')
        .in('id', roomIdArray)
    if (!rooms || rooms.length === 0) {
        return
    }
    const rooms_with_mentor_info = await Promise.all(
        rooms.map(async (room) => {
            const { data: mentor_data } = await supabase
                .from('mentor_application')
                .select('member_id,company,level')
                .eq('member_id', room.created_member_id)
                .single()
            const { data: mentor_name_data } = await supabase
                .from('member')
                .select('name')
                .eq('id', room.created_member_id)
                .single()
            return {
                ...room,
                mentor_name: mentor_name_data?.name || '알 수 없음',
                mentor_company: mentor_data?.company || '알 수 없음',
                mentor_level: mentor_data?.level || '알 수 없음'
            }
        })
    )
    return Response.json(rooms_with_mentor_info)
}