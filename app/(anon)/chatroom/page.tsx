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

interface ChatRoomWithMentor {
    id: number
    title: string
    created_member_id: string
    description: string
    mentorName: string
    mentorCompany: string
    mentorLevel: string
}

interface mentorInfoI {
    myMentorTitle: string,
    myMentorDescription: string
}

const Chatroom = () => {

    const router = useRouter()

    const [member, setMember] = useState<any | null>(null)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [chatRoomsWithMentor, setChatRoomsWithMentor] = useState<ChatRoomWithMentor[]>([])
    const [myMentorInfo, setMyMentorInfo] = useState<mentorInfoI[]>([])

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
        const fetchChatRoomsWithMentorInfo = async () => {
            if (chatRooms.length === 0) return;

            const roomsWithMentorInfo = await Promise.all(
                chatRooms.map(async (room) => {
                    const { data: mentorData } = await supabase
                        .from('mentor_application')
                        .select('member_id,company,level')
                        .eq('member_id', room.created_member_id)
                        .single()

                    const { data: mentorNameData } = await supabase
                        .from('member')
                        .select('name')
                        .eq('id', room.created_member_id)
                        .single()

                    return {
                        ...room,
                        mentorName: mentorNameData?.name || '알 수 없음',
                        mentorCompany: mentorData?.company || '알 수 없음',
                        mentorLevel: mentorData?.level || '알 수 없음'
                    }
                })
            )

            setChatRoomsWithMentor(roomsWithMentorInfo)
        }

        fetchChatRoomsWithMentorInfo()
    }, [chatRooms])

    useEffect(() => {
        if (!member) return
    
        const fetchMyMentorRooms = async () => {
            const { data: myRooms } = await supabase
                .from('chat_room')
                .select('title, description')
                .eq('created_member_id', member.id)
    
            const formatted = myRooms?.map(room => ({
                myMentorTitle: room.title,
                myMentorDescription: room.description
            })) || []
    
            setMyMentorInfo(formatted)
        }
    
        fetchMyMentorRooms()
    }, [member])


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
                    <div className={styles.main}>
                        <div className={styles.roomDiv}>
                            {chatRoomsWithMentor.map((room, index) => (
                                <div key={room.id}>
                                    <button className={styles.roomButtons} onClick={() => router.push(`/chat?room=${room.title}`)} >
                                        <div className={styles.mentorInfo2}>
                                            <h3 className={styles.roomTitle}> {room.mentorName} 멘토님의 {room.title} </h3>
                                            <h3 className={styles.mentorCompany}> {room.mentorCompany} </h3>
                                        </div>
                                        <h4 className={styles.roomDescription}>{room.description}</h4>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.recentChat}>
                    <h3 className={styles.recentChatH}> 내가 멘토인 채팅방 </h3>
                    <div className={styles.main}>
                        <div className={styles.roomDiv}>
                            {myMentorInfo.map((room, index) => (
                                <div key={room.myMentorTitle}>
                                    <button className={styles.roomButtons} onClick={() => router.push(`/chat?room=${room.myMentorTitle}`)} >
                                        <div className={styles.mentorInfo2}>
                                            <h3 className={styles.roomTitle}> {room.myMentorTitle} </h3>
                                        </div>
                                        <h4 className={styles.roomDescription}>{room.myMentorDescription}</h4>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> {chatRoomsWithMentor.length} </h1>
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