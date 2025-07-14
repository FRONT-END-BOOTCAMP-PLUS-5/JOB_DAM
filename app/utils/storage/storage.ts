export function getImageUrl(path:string){
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/board-upload-image/${path}`
}