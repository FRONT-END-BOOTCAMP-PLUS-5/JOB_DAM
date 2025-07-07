export default interface Data {
    id: number
    memberId: string
    title: string
    content: string
    createdAt: string
    deletedAt?: string
    updatedAt?: string
    categoryId: number
    recommend: number
    view: number
    member: {
        id: string
        name: string | null
        img: string | null
        nickname: string | null
    }
}