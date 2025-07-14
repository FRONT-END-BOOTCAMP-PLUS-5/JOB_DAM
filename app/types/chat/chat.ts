export interface message_interface {
    content: string
    member_id: string
}

export interface user_info {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}

export interface mentor_info {
    member_id: string,
    company: string,
    level: string
}

export interface mentor_name {
    name: string
}

export interface mem_info {
    nickname: string,
    img: string
}