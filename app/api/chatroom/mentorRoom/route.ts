import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')
    const supabase = await createClient()
    const { data: my_rooms } = await supabase
        .from('chat_room')
        .select('title, description')
        .eq('created_member_id', memberId)
    const formatted = my_rooms?.map(room => ({
        my_mentor_title: room.title,
        my_mentor_description: room.description
    })) || []
    return Response.json(formatted)
}