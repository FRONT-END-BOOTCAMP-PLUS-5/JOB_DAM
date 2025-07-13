"use client"

import styles from '../chat/chat.module.scss'
import { createClient } from '@supabase/supabase-js'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface message_interface {
    content: string
    member_id: string
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface user_info {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}

interface mentor_info {
    member_id: string,
    company: string,
    level: string
}

interface mentor_name {
    name: string
}

interface mem_info {
    nickname: string,
    img: string
}

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
        if (!roomName) {
            return
        }
        const find_chatroom_id = async () => {
            const { data: room_id_num } = await supabase
                .from('chat_room')
                .select('id')
                .eq('title', roomName)
            if (!room_id_num || room_id_num.length === 0) {
                return
            }
            setRoomId(room_id_num[0].id)
        }
        find_chatroom_id()
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
        if (!roomId) {
            return
        }
        const fetch_messages = async () => {
            const { data: received_data } = await supabase
                .from('chat')
                .select('content, member_id')
                .eq('chat_room_id', roomId)
                .order('created_at', { ascending: true });
            if (received_data) {
                setMessage(received_data as message_interface[])
            }
        }
        fetch_messages()
    }, [roomId])

    useEffect(() => {
        if (!roomId) {
            return
        }
        const find_created_member_id = async () => {
            const { data: find_created_id } = await supabase
                .from('chat_room')
                .select('created_member_id')
                .eq('id', roomId)
            if (find_created_id && find_created_id.length > 0) {
                setCreatedMemberId(find_created_id[0].created_member_id)
            }
        }
        find_created_member_id()
    }, [roomId])

    useEffect(() => {
        if (!roomId) {
            return
        }
        const find_member_number = async () => {
            const { data: find_member_num } = await supabase
                .from('chat_member')
                .select('member_id')
                .eq('chat_room_id', roomId)
            const member_num = find_member_num?.map(m => m.member_id) || []
            setMemberNumInfo(member_num)
        }
        find_member_number()
    }, [roomId])

    useEffect(() => {
        if (!createdMemberId) {
            return
        }
        const find_mentor_info = async () => {
            const { data: mentor_data } = await supabase
                .from('mentor_application')
                .select('member_id,company,level')
                .eq('member_id', createdMemberId)
                .single()
            setMentor(mentor_data)
            
            const { data: mentor_name_data } = await supabase
                .from('member')
                .select('name')
                .eq('id', createdMemberId)
                .single()
            setMentorName(mentor_name_data)
        }
        find_mentor_info()
    }, [createdMemberId])

    useEffect(() => {
        if (!memberNumInfo || memberNumInfo.length === 0) {
            return
        }
        const find_member_info = async () => {
            const { data: find_member_information } = await supabase
                .from('member')
                .select('img,nickname')
                .in('id', memberNumInfo)
            setMemberInfo(find_member_information)
        }
        find_member_info()
    }, [memberNumInfo])

    useEffect(() => {
        if (!message || message.length === 0) {
            return
        }
        const find_chat_member_info = async () => {
            const member_ids = message.map(m => m.member_id).filter(id => id)
            const unique_member_ids = [...new Set(member_ids)]
            
            if (unique_member_ids.length === 0) return
            
            const { data: member_data } = await supabase
                .from('member')
                .select('id, nickname')
                .in('id', unique_member_ids)
            
            const chat_member_names = message.map(msg => {
                const member_info = member_data?.find(m => m.id === msg.member_id)
                return member_info?.nickname || '알 수 없음'
            })
            
            setChatMemberName(chat_member_names)
            setChatMemberId(message.map(m => m.member_id))
        }
        find_chat_member_info()
    }, [message])

    const chatUI = (i: number) => {
        if (createdMemberId === chatMemberId?.[i]) {
            return (
                <div>
                    <div className={styles.mentee_up}>
                        <p className={styles.username_for_message}> {mentorName?.name} </p>
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
                        <p className={styles.username_for_message}> {chatMemberName?.[i]} </p>
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
                <p className={styles.header_logo}> Job담 </p>
                <div className={styles.chatroom_title_div}>
                    <p className={styles.chatroom_title}> {roomName} </p>
                    <p className={styles.chatroom_mentor_title}> {mentorName?.name} {mentor?.level}와의 실시간 Q&A </p>
                </div>
                <div className={styles.join_number}>
                    <p className={styles.join_number_p}> {memberNumInfo?.length}명 참여 중 </p>
                </div>
            </div>
            <div className={styles.main_chat}>
                <div className={styles.chat_side_bar}>
                    <div className={styles.mentor_profile}>
                        <img src="/mentorProfileExample.png" alt="멘토 프로필" />
                        <div className={styles.about_mentor}>
                            <p className={styles.mentor_name}> {mentorName?.name || '로딩 중...'} </p>
                            <div className={styles.mentor_role_div}>
                                <p className={styles.mentor_role}> {mentor?.level || '로딩 중...'} </p>
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
                                <div className={styles.member_name}>{member?.nickname}</div>
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