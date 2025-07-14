"use client"

import styles from '../chat/chat.module.scss'
import { createClient } from '@supabase/supabase-js'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import type {
    message_interface,
    user_info,
    mentor_info,
    mentor_name,
    mem_info
} from '../types/chat/chat'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const Chat = () => {

    const router = useRouter()
    const [user, setUser] = useState<user_info | null>(null)
    const [input, setInput] = useState<string>('')
    const roomRef = useRef<RealtimeChannel | null>(null)
    const [message, setMessage] = useState<message_interface[]>([])
    const [roomName, setRoomName] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<number | null>(null)
    const [createdMemberId, setCreatedMemberId] = useState<string | null>(null)
    const [mentor, setMentor] = useState<mentor_info | null>(null)
    const [mentorName, setMentorName] = useState<mentor_name | null>(null)
    const [memberNumInfo, setMemberNumInfo] = useState<string[] | null>(null)
    const [memberInfo, setMemberInfo] = useState<mem_info[] | null>(null)
    const [chatMemberId, setChatMemberId] = useState<string[] | null>(null)
    const [chatMemberName, setChatMemberName] = useState<string[] | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify({
                id: 'f6d4945a-2251-4284-bed5-327f44bc2c7f',
                name: '승주',
                email: '승주@gmail.com',
                password: 'seungjoo',
                img: 'https://yqutjsbcupbfpphjmaax.supabase.co/storage/v1/object/public/user-profile-image/1752045446080_wig2gl.jpeg',
                nickname: '승쥬'
            }))
            const stored_user = localStorage.getItem('user');
            if (stored_user) {
                setUser(JSON.parse(stored_user));
            }
        }
    }, [])

    function message_received(payload: string) {
        setMessage(prev => [...prev, { content: payload, member_id: '' }])
    }

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const room = query.get('room');
        if (room) {
            setRoomName(room);
        }
    }, []);

    useEffect(() => {
        if (!roomName) {
            return
        }
        const room = supabase.channel(roomName)
        roomRef.current = room
        room
            .on('broadcast', { event: 'shout' }, (payload) => { message_received(payload.payload); })
            .subscribe()
    }, [roomName])

    useEffect(() => {
        if (!roomName) return
        const fetchRoomId = async () => {
            const res = await fetch(`/api/chat/room/id?roomName=${encodeURIComponent(roomName)}`)
            if (res.ok) {
                const result = await res.json()
                setRoomId(result)
            }
        }
        fetchRoomId()
    }, [roomName])

    const message_submission = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !input.trim()) {
            alert('유저가 없거나 메시지가 비어있습니다.')
            return
        }
        const { data } = await supabase.from('chat').insert([{
            content: input,
            member_id: user.id,
            chat_room_id: roomId
        }]).select('content, member_id')
        if (data) {
            setMessage(prev => [...prev, { content: input, member_id: user.id }])
        }
        await roomRef.current?.send({
            type: 'broadcast',
            event: 'shout',
            payload: input
        })
        setInput('')
    }

    useEffect(() => {
        if (!roomId) return
        const fetchMessages = async () => {
            const res = await fetch(`/api/chat/message?roomId=${roomId}`)
            if (res.ok) {
                const result = await res.json()
                setMessage(result as message_interface[])
            }
        }
        fetchMessages()
    }, [roomId])

    useEffect(() => {
        if (!roomId) return
        const fetchCreatedMemberId = async () => {
            const res = await fetch(`/api/chat/room/creator?roomId=${roomId}`)
            if (res.ok) {
                const result = await res.json()
                setCreatedMemberId(result)
            }
        }
        fetchCreatedMemberId()
    }, [roomId])

    useEffect(() => {
        if (!roomId) return
        const fetchMemberIds = async () => {
            const res = await fetch(`/api/chat/member/chatInfo?roomId=${roomId}`)
            if (res.ok) {
                const result = await res.json()
                const memberIds = result.map((id: string) => String(id))
                setMemberNumInfo(memberIds)
            }
        }
        fetchMemberIds()
    }, [roomId])

    useEffect(() => {
        if (!memberNumInfo || memberNumInfo.length === 0) {
            return
        }
        const fetchMemberInfo = async () => {
            const memberIdsString = memberNumInfo.join(',')
            const res = await fetch(`/api/chat/member/id?memberIds=${memberIdsString}`)
            if (res.ok) {
                const result = await res.json()
                setMemberInfo(result)
            }
        }
        fetchMemberInfo()
    }, [memberNumInfo])

    useEffect(() => {
        if (!createdMemberId) return
        const fetchMentorInfo = async () => {
            const res = await fetch(`/api/chat/mentor?memberId=${createdMemberId}`)
            if (res.ok) {
                const result = await res.json()
                setMentor(result.mentor)
                setMentorName(result.mentorName)
            }
        }
        fetchMentorInfo()
    }, [createdMemberId])

    useEffect(() => {
        if (!memberNumInfo || memberNumInfo.length === 0) {
            return
        }
        const fetchMemberInfo = async () => {
            const response = await fetch(`/api/member/imgAndNickname?memberIds=${memberNumInfo.join(',')}`)
            if (response.ok) {
                const data = await response.json()
                setMemberInfo(data)
            }
        }
        fetchMemberInfo()
    }, [memberNumInfo])

    useEffect(() => {
        if (!message || message.length === 0) {
            return
        }
        const fetchChatMemberInfo = async () => {
            const member_ids = message.map(m => m.member_id).filter(id => id)
            const unique_member_ids = [...new Set(member_ids)]
            if (unique_member_ids.length === 0) {
                return
            }
            const response = await fetch(`/api/chat/member/id?memberIds=${unique_member_ids.join(',')}`)
            if (response.ok) {
                const member_data = await response.json()
                const chat_member_names = message.map(msg => {
                    const member_info = (member_data as { id: string, nickname: string }[]).find(m => String(m.id) === String(msg.member_id))
                    return member_info?.nickname || '알 수 없음'
                })
                setChatMemberName(chat_member_names)
                setChatMemberId(message.map(m => m.member_id))
            }
        }
        fetchChatMemberInfo()
    }, [message])

    const chatUI = (i: number) => {
        if (createdMemberId && chatMemberId?.[i] && String(createdMemberId) === String(chatMemberId[i])) {
            return (
                <div>
                    <div className={styles.mentee_up}>
                        <div className={styles.username_with_image}>
                            <p className={styles.username_for_message}> {mentorName?.name || '멘토'} </p>
                        </div>
                        <div className={styles.role_for_mentor}>
                            <p> 멘토 </p>
                        </div>
                    </div>
                    <div key={i} className={styles.message}>
                        {message?.[i]?.content}</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className={styles.mentee_up}>
                        <div className={styles.username_with_image}>
                            <p className={styles.username_for_message}> {chatMemberName?.[i] || '멘티'} </p>
                        </div>
                        <div className={styles.mentee_role}>
                            <p> 멘티 </p>
                        </div>
                    </div>
                    <div key={i} className={styles.message}>
                        <div className={styles.question_icon}> 질문 </div>
                        {message?.[i]?.content}</div>
                </div>
            )
        }
    }

    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <div className={styles.chatroom_title_div}>
                    <p className={styles.chatroom_title}> {roomName || '로딩 중...'} </p>
                    <p className={styles.chatroom_mentor_title}> {mentorName?.name || '멘토'} {mentor?.level ? `${mentor.level}` : ''}와의 실시간 Q&A </p>
                </div>
                <div className={styles.join_number}>
                    <p className={styles.join_number_p}> {memberNumInfo?.length || 0}명 참여 중 </p>
                </div>
            </div>
            <div className={styles.main_chat}>
                <div className={styles.chat_side_bar}>
                    <div className={styles.mentor_profile}>
                        <img src="/mentorProfileExample.png" alt="멘토 프로필" />
                        <div className={styles.about_mentor}>
                            <p className={styles.mentor_name}> {mentorName?.name || '로딩 중...'} </p>
                            <div className={styles.mentor_role_div}>
                                <p className={styles.mentor_role}> {mentor?.level || '멘토'} </p>
                            </div>
                            <p className={styles.online_or_not}> 온라인(임시) </p>
                            <button className={styles.go_to_chatting_rooms} onClick={() => { router.push('/chatroom') }}> 채팅방 화면으로 가기 </button>
                        </div>
                    </div>
                    <div className={styles.member_number_div}>
                        <p className={styles.member_number}> 참여자 {memberNumInfo?.length || 0}명 </p>
                    </div>
                    <div className={styles.mentor_badge_div}>
                        <p> {mentorName?.name || '로딩 중...'} </p>
                        <div className={styles.mentor_badge}>
                            <div className={styles.mentor_badge_circle}>
                                <p className={styles.mentor_badge_circle_p}>멘토</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mentee_badge_div}>
                        {memberInfo?.map((member, index) => (
                            <div className={styles.mem} key={index}>
                                <div className={styles.member_name}>{member?.nickname || '멘티'}</div>
                                <div className={styles.mentor_badge}>
                                    <p className={styles.mentee_badge_circle}> 멘티 </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.main_chat_space}>
                    <div className={styles.chat_records_space}>
                        <div>
                            {message.map((msg, i) => (
                                <div key={i}>
                                    {chatUI(i)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={message_submission}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={styles.input_form}
                            placeholder="메시지를 입력하세요..."
                        />
                        <button type="submit" className={styles.input_submit_button}> 전송 </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
export { Chat }