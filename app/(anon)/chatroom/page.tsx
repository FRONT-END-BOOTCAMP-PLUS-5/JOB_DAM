"use client"

import styles from '../chatroom/chatroom.module.scss'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ChatRoom {
    id: number
    title: string,
    created_member_id: string
}

interface mentorInfo {
    company: string,
    level: string
}

const Chatroom = () => {

    const [member, setMember] = useState<any | null>(null)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [mentorId, setMentorId] = useState<string[] | null>([])
    const [mentor, setMentor] = useState<mentorInfo[] | null>(null)

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
            const storedMember = localStorage.getItem('member');
            if (storedMember) {
                setMember(JSON.parse(storedMember));
            }
        }
    }, [])

    useEffect(() => {
        if (!member) {
            return
        }
        const findRooms = async () => {
            const { data: chatMember } = await supabase
                .from('chat_member')
                .select('chat_room_id')
                .eq('member_id', member.id)
            const roomId = chatMember?.map(m => m.chat_room_id) || []
            const { data: roomData } = await supabase
                .from('chat_room')
                .select('id,title,created_member_id')
                .in('id', roomId)
            setChatRooms(roomData || [])
        }
        findRooms()
    }, [member])

    useEffect(() => {
        const findChatroomInfo = async () => {
            const chatRoomIds = chatRooms.map(r => r.id)
            const mentorIds = chatRooms.map(room => room.created_member_id)
            setMentorId(mentorIds || [])
        }
        findChatroomInfo()
    }, [chatRooms])

    useEffect(() => {
        const findMentorId = async () => {
            if (!mentorId) {
                return
            }
            const { data: mentorData } = await supabase
                .from('mentor_application')
                .select('company,level')
                .in('member_id', mentorId)
            setMentor(mentorData)
        }
        findMentorId()
    }, [mentorId])



    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <button className={styles.headerButton1}> + </button>
                <button className={styles.headerButton2}> 마이페이지 </button>
            </div>
            <div className={styles.recentChat}>
                <h3 className={styles.recentChatH}> 최근 채팅 </h3>
            </div>
            <div>
                {chatRooms.map((room,index) => (
                    <div key={room.id}>
                        <button>
                            <h3>{room.title} {mentor?.[index]?.company}</h3>
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.main}></div>
            <div className={styles.bottom}>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> 24 </h1>
                    <p> 총 채팅방 </p>
                </div>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> 12 </h1>
                    <p> 활성 멘토 </p>
                </div>
            </div>
        </div>
    )
}

export default Chatroom;
export { Chatroom }