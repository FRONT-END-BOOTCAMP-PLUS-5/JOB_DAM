import { createClient } from '../../../../utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const memberIds = searchParams.get('memberIds')
    if (!memberIds) {
        return
    }
    const memberIdArray = memberIds.split(',').map(id => id.trim()).filter(id => id.length > 0)
    if (memberIdArray.length === 0) {
        return
    }
    const supabase = await createClient()
    const { data } = await supabase
        .from('member')
        .select('id, nickname')
        .in('id', memberIdArray)
    return Response.json(data || [])
}