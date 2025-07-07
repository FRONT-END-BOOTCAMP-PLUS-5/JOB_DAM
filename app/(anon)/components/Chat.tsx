"use client"

import styles from '../components/Chat.module.scss'
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

const Chat = () => {

    const [input, setInput] = useState<string>('')
    const roomRef = useRef<RealtimeChannel | null>(null)
    const [message, setMessage] = useState<messageInterface[]>([])

    function messageReceived(payload:string) {
        console.log('payload:',payload)
    }

    useEffect(() => {
        const room = supabase.channel('test-channel')
        roomRef.current = room
        console.log('hey')
        room
            .on('broadcast', { event: 'shout' }, (payload) => messageReceived(payload.event))
            .subscribe()
    }, [])

    const messageSubmission = async (e: React.FormEvent) => {
        e.preventDefault()
        const {data} = await supabase.from('chat').insert([{ content: input }]).select('content')
        if(data){
            setMessage(prev=>[...prev,{content:input}])
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
        const fetchMessages = async () => {
            const { data: receivedData } = await supabase.from('chat').select('content');
            if (receivedData) {
                setMessage(receivedData as messageInterface[])
            }
        }
        fetchMessages()
    }, [])

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
                            <div className={styles.mentorBadgeCircle}> 멘토 </div>
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
                                <div key={i} className={styles.message}>{message.content}</div>
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

export { Chat };