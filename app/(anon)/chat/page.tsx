"use client"

import styles from '../chat/chat.module.scss'
import { createClient } from '@supabase/supabase-js'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

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

interface mentorInfo {
    member_id: string,
    company: string,
    level: string
}

interface mentorName {
    name: string
}

interface memInfo {
    nickname: string,
    img: string
}

const Chat = () => {

    const router = useRouter()

    const [user, setUser] = useState<userInfo | null>(null)
    const [input, setInput] = useState<string>('')
    const roomRef = useRef<RealtimeChannel | null>(null)
    const [message, setMessage] = useState<messageInterface[]>([])
    const [roomName, setRoomName] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<number | null>(null)
    const [createdMemberId, setCreatedMemberId] = useState<string | null>(null)

    const [mentorId, setMentorId] = useState<string[] | null>([])
    const [mentor, setMentor] = useState<mentorInfo[] | null>(null)
    const [mentorName, setMentorName] = useState<mentorName[] | null>(null)
    const [memberNumInfo, setMemberNumInfo] = useState<string[] | null>(null)
    const [memberInfo, setMemberInfo] = useState<memInfo[] | null>(null)
    const [chatMemberId, setChatMemberId] = useState<string[] | null>(null)
    const [chatMemberName, setChatMemberName] = useState<string[] | null>(null)

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
            .on('broadcast', { event: 'shout' }, (payload) => { messageReceived(payload.payload); })
            .subscribe()
    }, [])

    useEffect(() => {
        if (!roomName) {
            return
        }
        const findChatroomId = async () => {
            const { data: roomIdNum } = await supabase
                .from('chat_room')
                .select('id')
                .in('title', [roomName])
            if (!roomIdNum) {
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
        setInput('')
    }

    useEffect(() => {
        if (!roomId) {
            return
        }
        const fetchMessages = async () => {
            const { data: receivedData } = await supabase.from('chat').select('content').in('chat_room_id', [roomId]);
            if (receivedData) {
                setMessage(receivedData as messageInterface[])
            }
        }
        fetchMessages()
    }, [roomId])

    useEffect(() => {
        const findCreatedMemberId = async () => {
            const { data: findCreatedId } = await supabase
                .from('chat_room')
                .select('created_member_id')
                .in('id', [roomId])
            setCreatedMemberId(findCreatedId?.[0].created_member_id)
        }
        findCreatedMemberId()
    }, [roomId])

    useEffect(() => {
        const findMemberNumber = async () => {
            const { data: findMemberNum } = await supabase
                .from('chat_member')
                .select('member_id')
                .in('chat_room_id', [roomId])
            const memberNum = findMemberNum?.map(m => m.member_id) || []
            setMemberNumInfo(memberNum)
        }
        findMemberNumber()
    }, [roomId])

    useEffect(() => {
        const findMemId = async () => {
            console.log('message: ', message)
            const messageContents = message?.map((m) => m.content)
            console.log('messageContents: ', messageContents)
            const { data: findMemberId } = await supabase
                .from('chat')
                .select('member_id')
                .in('content', [messageContents])
            const chatMembersId = findMemberId?.map((m) => m.member_id)
            console.log('chatMembersId: ', chatMembersId)
            setChatMemberId(chatMembersId as string[])
        }
        findMemId()
    }, [message])

    useEffect(()=>{
        const findChatMemberName = async() => {
            const {data: findChatMemName} = await supabase
                .from('member')
                .select('nickname')
                .in('id',[chatMemberId])
            const chatMemberName = findChatMemName?.map((name)=>name.nickname)
            setChatMemberName(chatMemberName as string[])
        }
        findChatMemberName()
    }, [chatMemberId])

    useEffect(() => {
        const findMemberInfo = async () => {
            const { data: findMemberInformation } = await supabase
                .from('member')
                .select('img,nickname')
                .in('id', [memberNumInfo])
            setMemberInfo(findMemberInformation)
        }
        findMemberInfo()
    }, [memberNumInfo])

    useEffect(() => {
        const findMentorId = async () => {
            if (!mentorId) {
                return
            }
            const { data: mentorData } = await supabase
                .from('mentor_application')
                .select('member_id,company,level')
                .in('member_id', [createdMemberId])
            setMentor(mentorData)
        }
        const findMentorName = async () => {
            if (!mentorId) {
                return
            }
            const { data: findMentorName } = await supabase
                .from('member')
                .select('name')
                .in('id', [createdMemberId])
            setMentorName(findMentorName)
        }
        findMentorId()
        findMentorName()
    }, [createdMemberId])





    const chatUI = (i: number) => {
        console.log('mentorId: ', createdMemberId)
        console.log('menteeId: ', chatMemberId?.[i])
        if (createdMemberId === chatMemberId?.[i]) {
            return (
                <div>
                    <div className={styles.menteeUp}>
                        <p className={styles.usernameForMessage}> {mentorName?.[0]?.name} </p>
                        <div className={styles.roleForMentor}> 
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
                    <div className={styles.menteeUp}>
                        <p className={styles.usernameForMessage}> {chatMemberName?.[i]} </p>
                        <div className={styles.menteeRole}> 
                            <p> 멘티 </p>
                        </div>
                    </div>
                    <div key={i} className={styles.message}>
                        <div className={styles.questionIcon}> 질문 </div>
                        {message?.[i]?.content}</div>
                </div>
            )
        }
    }

    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <div className={styles.chatroomTitleDiv}>
                    <p className={styles.chatroomTitle}> {roomName} </p>
                    <p className={styles.chatroomMentorTitle}> {mentorName?.[0]?.name} {mentor?.[0]?.level}와의 실시간 Q&A </p>
                </div>
                <div className={styles.joinNumber}>
                    <p className={styles.joinNumberP}> {memberNumInfo?.length}명 참여 중 </p>
                </div>
            </div>
            <div className={styles.mainChat}>
                <div className={styles.chatSideBar}>
                    <div className={styles.mentorProfile}>
                        <img src="/mentorProfileExample.png" />
                        <div className={styles.aboutMentor}>
                            <p className={styles.mentorName}> {mentorName?.[0]?.name} </p>
                            <div className={styles.mentorRoleDiv}>
                                <p className={styles.mentorRole}> {mentor?.[0]?.level} </p>
                            </div>
                            <p className={styles.onlineOrNot}> 온라인(임시) </p>
                            <button className={styles.goToChattingRooms} onClick={() => { router.push('/chatroom') }}> 채팅방 화면으로 가기 </button>
                        </div>
                    </div>
                    <div className={styles.memberNumberDiv}>
                        <p className={styles.memberNumber}> 참여자 {memberNumInfo?.length}명 </p>
                    </div>
                    <div className={styles.mentorBadgeDiv}>
                        <p> {mentorName?.[0]?.name} </p>
                        <div className={styles.mentorBadge}>
                            <div className={styles.mentorBadgeCircle}>
                                <p className={styles.mentorBadgeCircleP}>멘토</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.menteeBadgeDiv}>
                        {memberInfo?.map((member, index) => (
                            <div className={styles.mem} key={index}>
                                <div key={index} className={styles.memberName}>{memberInfo?.[index]?.nickname}</div>
                                <div className={styles.mentorBadge}>
                                    <p className={styles.menteeBadgeCircle}> 멘티 </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.mainChatSpace}>
                    <div className={styles.chatRecordsSpace}>
                        <div>
                            {message.map((message, i) => (
                                <div key={i}>
                                    {chatUI(i)}
                                </div>
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