"use client"

import styles from '../chatroom/chatroom.module.scss'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ChatRoom {
    id: number
    title: string,
    created_member_id: string,
    description: string
}

interface mentorInfo {
    member_id: string,
    company: string,
    level: string
}

interface mentorName {
    name: string
}

const Chatroom = () => {

    const router = useRouter()

    const [member, setMember] = useState<any | null>(null)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [mentorId, setMentorId] = useState<string[] | null>([])
    const [mentor, setMentor] = useState<mentorInfo[] | null>(null)
    const [mentorName, setMentorName] = useState<mentorName[] | null>(null)
    const [roomSumNum, setRoomSumNum] = useState<number>(0)

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
                .select('id,title,created_member_id,description')
                .in('id', roomId)
            setChatRooms(roomData || [])
        }
        findRooms()
    }, [member])

    useEffect(() => {
        const findChatroomInfo = async () => {
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
                .select('member_id,company,level')
                .in('member_id', mentorId)
            setMentor(mentorData)
        }
        const findMentorName = async () => {
            if (!mentorId) {
                return
            }
            const { data: findMentorName } = await supabase
                .from('member')
                .select('name')
                .in('id', mentorId)
            setMentorName(findMentorName)
        }
        findMentorId()
        findMentorName()
    }, [mentorId])



    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <button className={styles.headerButton1} onClick={() => { router.push('/createRoom') }}> + </button>
                <button className={styles.headerButton2}> 마이페이지 </button>
            </div>
            <div className={styles.recentChatHDiv}>
                <div className={styles.recentChat}>
                    <h3 className={styles.recentChatH}> 내가 멘티인 채팅방 </h3>
                </div>
                <div className={styles.recentChat}>
                    <h3 className={styles.recentChatH}> 내가 멘토인 채팅방 </h3>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.roomDiv}>
                    {chatRooms.map((room, index) => (
                        <div key={room.id}>
                            <button className={styles.roomButtons} onClick={() => router.push(`/chat?room=${room.title}`)} >
                                <div className={styles.mentorInfo2}>
                                    <h3 className={styles.roomTitle}> {mentorName?.[index]?.name} 멘토님의 {room.title} </h3>
                                    <h3 className={styles.mentorCompany}> {mentor?.[index]?.company} </h3>
                                </div>
                                <h4 className={styles.roomDescription}>{chatRooms?.[index]?.description}</h4>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> {mentorName?.length} </h1>
                    <p> 총 채팅방 </p>
                </div>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> 0 </h1>
                    <p> 활성 멘토 </p>
                </div>
            </div>
        </div >
    )
}

export default Chatroom;
export { Chatroom }