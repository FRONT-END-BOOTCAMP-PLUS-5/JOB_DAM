"use client"

import styles from '../chatroom/chatroom.module.scss'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface chat_room {
    id: number
    title: string,
    created_member_id: string,
    description: string
}

interface chat_room_with_mentor {
    id: number
    title: string
    created_member_id: string
    description: string
    mentor_name: string
    mentor_company: string
    mentor_level: string
}

interface mentor_info_i {
    my_mentor_title: string,
    my_mentor_description: string
}

interface member_info {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}

const Chatroom = () => {

    const router = useRouter()

    const [member, setMember] = useState<member_info | null>(null)
    const [chatRooms, setChatRooms] = useState<chat_room[]>([])
    const [chatRoomsWithMentor, setChatRoomsWithMentor] = useState<chat_room_with_mentor[]>([])
    const [myMentorInfo, setMyMentorInfo] = useState<mentor_info_i[]>([])

    useEffect(() => {
        if (typeof window != undefined) {
            localStorage.setItem('member', JSON.stringify({
                id: 'f6d4945a-2251-4284-bed5-327f44bc2c7f',
                name: '승주',
                email: '승주@gmail.com',
                password: 'seungjoo',
                img: '1',
                nickname: '승쥬'
            }))
        }

        if (typeof window != undefined) {
            const stored_member = localStorage.getItem('member');
            if (stored_member) {
                setMember(JSON.parse(stored_member));
            }
        }
    }, [])

    useEffect(() => {
        if (!member) {
            return
        }
        const find_rooms = async () => {
            const { data: chat_member } = await supabase
                .from('chat_member')
                .select('chat_room_id')
                .eq('member_id', member.id)
            const room_id = chat_member?.map(m => m.chat_room_id) || []
            const { data: room_data } = await supabase
                .from('chat_room')
                .select('id,title,created_member_id,description')
                .in('id', room_id)
            setChatRooms(room_data || [])
        }
        find_rooms()
    }, [member])

    useEffect(() => {
        const fetch_chat_rooms_with_mentor_info = async () => {
            if (chatRooms.length === 0) return;

            const rooms_with_mentor_info = await Promise.all(
                chatRooms.map(async (room) => {
                    const { data: mentor_data } = await supabase
                        .from('mentor_application')
                        .select('member_id,company,level')
                        .eq('member_id', room.created_member_id)
                        .single()

                    const { data: mentor_name_data } = await supabase
                        .from('member')
                        .select('name')
                        .eq('id', room.created_member_id)
                        .single()

                    return {
                        ...room,
                        mentor_name: mentor_name_data?.name || '알 수 없음',
                        mentor_company: mentor_data?.company || '알 수 없음',
                        mentor_level: mentor_data?.level || '알 수 없음'
                    }
                })
            )

            setChatRoomsWithMentor(rooms_with_mentor_info)
        }

        fetch_chat_rooms_with_mentor_info()
    }, [chatRooms])

    useEffect(() => {
        if (!member) return

        const fetch_my_mentor_rooms = async () => {
            const { data: my_rooms } = await supabase
                .from('chat_room')
                .select('title, description')
                .eq('created_member_id', member.id)

            const formatted = my_rooms?.map(room => ({
                my_mentor_title: room.title,
                my_mentor_description: room.description
            })) || []

            setMyMentorInfo(formatted)
        }

        fetch_my_mentor_rooms()
    }, [member])


    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <button className={styles.header_button1} onClick={() => { router.push('/createRoom') }}> + </button>
                <button className={styles.header_button2}> 마이페이지 </button>
            </div>
            <div className={styles.recent_chat_h_div}>
                <div className={styles.recent_chat}>
                    <h3 className={styles.recent_chat_h}> 내가 멘티인 채팅방 </h3>
                    <div className={styles.main}>
                        <div className={styles.room_div}>
                            {chatRoomsWithMentor.map((room) => (
                                <div key={room.id}>
                                    <button className={styles.room_buttons} onClick={() => router.push(`/chat?room=${room.title}`)} >
                                        <div className={styles.mentor_info2}>
                                            <h3 className={styles.room_title}> {room.mentor_name} 멘토님의 {room.title} </h3>
                                            <h3 className={styles.mentor_company}> {room.mentor_company} </h3>
                                        </div>
                                        <h4 className={styles.room_description}>{room.description}</h4>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.recent_chat}>
                    <h3 className={styles.recent_chat_h}> 내가 멘토인 채팅방 </h3>
                    <div className={styles.main}>
                        <div className={styles.room_div}>
                            {myMentorInfo.map((room) => (
                                <div key={room.my_mentor_title}>
                                    <button className={styles.room_buttons} onClick={() => router.push(`/chat?room=${room.my_mentor_title}`)} >
                                        <div className={styles.mentor_info2}>
                                            <h3 className={styles.room_title}> {room.my_mentor_title} </h3>
                                        </div>
                                        <h4 className={styles.room_description}>{room.my_mentor_description}</h4>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom_box}>
                    <h1 className={styles.bottom_num}> {chatRoomsWithMentor.length} </h1>
                    <p> 총 채팅방 </p>
                </div>
                <div className={styles.bottom_box}>
                    <h1 className={styles.bottom_num}> 0 </h1>
                    <p> 활성 멘토 </p>
                </div>
            </div>
        </div >
    )
}

export default Chatroom;
export { Chatroom }