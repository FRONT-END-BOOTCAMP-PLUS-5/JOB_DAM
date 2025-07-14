"use client"

import styles from '../chatroom/chatroom.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import type {
    chat_room,
    chat_room_with_mentor,
    mentor_info_i,
    member_info
} from '../types/chatroom/chatroom'

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
            const response = await fetch(`/api/chatroom/roomData?memberId=${member.id}`)
            const room_data = await response.json()
            setChatRooms(room_data || [])
        }
        find_rooms()
    }, [member])

    useEffect(() => {
        const fetch_chat_rooms_with_mentor_info = async () => {
            if (chatRooms.length === 0) return;
            const roomIds = chatRooms.map(room => room.id).join(',')
            const response = await fetch(`/api/chatroom/mentorInfo?roomIds=${roomIds}`)
            const rooms_with_mentor_info = await response.json()
            setChatRoomsWithMentor(rooms_with_mentor_info)
        }
        fetch_chat_rooms_with_mentor_info()
    }, [chatRooms])

    useEffect(() => {
        if (!member) return
        const fetch_my_mentor_rooms = async () => {
            const response = await fetch(`/api/chatroom/mentorRoom?memberId=${member.id}`)
            const formatted = await response.json()
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