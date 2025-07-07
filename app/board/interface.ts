export interface JsonType {
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
}