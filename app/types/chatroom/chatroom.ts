export interface chat_room {
    id: number
    title: string,
    created_member_id: string,
    description: string
}

export interface chat_room_with_mentor {
    id: number
    title: string
    created_member_id: string
    description: string
    mentor_name: string
    mentor_company: string
    mentor_level: string
}

export interface mentor_info_i {
    my_mentor_title: string,
    my_mentor_description: string
}

export interface member_info {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}