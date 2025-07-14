import { createClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    if (!roomId) {
        return
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('chat')
        .select('content, member_id')
        .eq('chat_room_id', parseInt(roomId))
        .order('created_at', { ascending: true })
    return Response.json(data || [])
}

export async function POST(request: Request) {
    const { input, userId, roomId } = await request.json()
    if (!input || !userId || !roomId) {
        return Response.json(
            { error: 'Input, userId, and roomId are required' },
            { status: 400 }
        )
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('chat')
        .insert([
            {
                content: input,
                member_id: userId,
                chat_room_id: roomId,
            }
        ])
        .select('content, member_id')
    return Response.json(data)
}