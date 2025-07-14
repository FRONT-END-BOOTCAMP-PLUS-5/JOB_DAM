import { createClient } from '../../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    if (!roomId) {
        return
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('chat_room')
        .select('created_member_id')
        .eq('id', parseInt(roomId))
    return Response.json(data?.[0]?.created_member_id || null)
}