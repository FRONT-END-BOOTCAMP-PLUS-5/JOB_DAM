import { createClient } from '../../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const roomName = searchParams.get('roomName')
    if (!roomName) {
        return
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('chat_room')
        .select('id')
        .eq('title', roomName)
    return Response.json(data?.[0]?.id || null)
}
