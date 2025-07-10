"use client"

import styles from '../chat/chat.module.scss'
import { createClient } from '@supabase/supabase-js'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useState, useEffect, useRef } from 'react'

interface messageInterface {
    content: string
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface userInfo {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}

const Chat = () => {

    const [user, setUser] = useState<userInfo | null>(null)
    const [input, setInput] = useState<string>('')
    const roomRef = useRef<RealtimeChannel | null>(null)
    const [message, setMessage] = useState<messageInterface[]>([])
    const [roomName, setRoomName] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<number | null>(null)

    if (typeof window != 'undefined') {
        localStorage.setItem('user', JSON.stringify({
            id: 'f6d4945a-2251-4284-bed5-327f44bc2c7f',
            name: '승주',
            email: '승주@gmail.com',
            password: 'seungjoo',
            img: 'https://yqutjsbcupbfpphjmaax.supabase.co/storage/v1/object/public/user-profile-image/1752045446080_wig2gl.jpeg',
            nickname: '승쥬'
        }))
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [])

    function messageReceived(payload: string) {
        console.log('payload:', payload)
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const room = query.get('room');
        console.log('room: ',room)
        if (room) {
            setRoomName(room);
        }
    }, []);

    useEffect(() => {
        if(!roomName) {
            return
        }
        const room = supabase.channel(roomName)
        roomRef.current = room
        console.log('room: ',room)
        room
            .on('broadcast', { event: 'shout' }, (payload) => {messageReceived(payload.payload); console.log('payload.payload: ',payload.payload)})
            .subscribe()
    }, [])

    useEffect(()=>{
        if(!roomName) {
            return
        }
        const findChatroomId = async() => {
            const {data:roomIdNum} = await supabase
                .from('chat_room')
                .select('id')
                .in('title',[roomName])
            if(!roomIdNum) {
                return
            }
            setRoomId(roomIdNum[0].id)
        }
        findChatroomId()
    })

    const messageSubmission = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            alert('유저가 없습니다.')
            return
        }
        const { data } = await supabase.from('chat').insert([{
            content: input,
            member_id: user.id,
            chat_room_id: roomId
        }]).select('content')
        if (data) {
            setMessage(prev => [...prev, { content: input }])
        }
        await roomRef.current?.send({
            type: 'broadcast',
            event: 'shout',
            payload: input
        })
        console.log('input:', input)
        setInput('')
    }

    useEffect(() => {
        if(!roomId) {
            return
        }
        const fetchMessages = async () => {
            const { data: receivedData } = await supabase.from('chat').select('content').in('chat_room_id', [roomId]);
            console.log('receivedData: ', receivedData)
            if (receivedData) {
                setMessage(receivedData as messageInterface[])
            }
        }
        fetchMessages()
    }, [roomId])

    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <div className={styles.chatroomTitleDiv}>
                    <p className={styles.chatroomTitle}> 스타트업 개발자 멘토링(임시) </p>
                    <p className={styles.chatroomMentorTitle}> 김현직(임시) 시니어 개발자(임시)와의 실시간 Q&A </p>
                </div>
                <div className={styles.joinNumber}>
                    <p className={styles.joinNumberP}> 3(임시)명 참여 중 </p>
                </div>
            </div>
            <div className={styles.mainChat}>
                <div className={styles.chatSideBar}>
                    <div className={styles.mentorProfile}>
                        <img src="/mentorProfileExample.png" />
                        <div className={styles.aboutMentor}>
                            <p className={styles.mentorName}> 김현직(임시) </p>
                            <div className={styles.mentorRoleDiv}>
                                <p className={styles.mentorRole}> 시니어 개발자(임시) 토스 (임시) </p>
                            </div>
                            <p className={styles.onlineOrNot}> 온라인(임시) </p>
                        </div>
                    </div>
                    <div className={styles.memberNumberDiv}>
                        <p className={styles.memberNumber}> 참여자 (3(임시)명) </p>
                    </div>
                    <div className={styles.mentorBadgeDiv}>
                        <p> 김현직 </p>
                        <div className={styles.mentorBadge}>
                            <div className={styles.mentorBadgeCircle}>
                                <p className={styles.mentorBadgeCircleP}>멘토</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mentorBadgeDiv}>
                        <p> 멘티 이름 </p>
                        <div className={styles.mentorBadge}>
                            <p className={styles.menteeBadgeCircle}> 멘티 </p>
                        </div>
                    </div>
                    <div className={styles.mentorBadgeDiv}>
                        <p> 멘티 이름 </p>
                        <div className={styles.mentorBadge}>
                            <p className={styles.menteeBadgeCircle}> 멘티 </p>
                        </div>
                    </div>
                </div>
                <div className={styles.mainChatSpace}>
                    <div className={styles.chatRecordsSpace}>
                        <div>
                            {message.map((message, i) => (
                                <div key={i} className={styles.message}>{`${user?.name}`}{message.content}</div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={messageSubmission}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} className={styles.inputForm} />
                        <button type="submit" className={styles.inputSubmitButton}> 전송 </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
export { Chat }