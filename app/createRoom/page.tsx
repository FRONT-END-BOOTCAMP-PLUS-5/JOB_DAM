"use client"

import styles from '../createRoom/createRoom.module.scss'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface member_info {
    id: string,
    name: string,
    email: string,
    password: string,
    img: string,
    nickname: string
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const CreateRoom = () => {

    const router = useRouter()

    const [member, setMember] = useState<member_info | null>(null)
    const [roomName, setRoomName] = useState<string>('');
    const [roomDescription, setRoomDescription] = useState<string>('');
    const [maxNum, setMaxNum] = useState<number>(0);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [agreeTerms2, setAgreeTerms2] = useState<boolean>(false);

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

    const submitted = async () => {
        if (!agreeTerms || !agreeTerms2) {
            alert("필수 사항에 체크해주세요.")
        }
        else {
            send_to_supabase()
            alert('방을 만들었습니다.')
            router.push('./chatroom')
        }
    }

    const send_to_supabase = async () => {
        await supabase.from('chat_room').insert([{
            title: roomName,
            description: roomDescription,
            created_member_id: member?.id,
            max_people: maxNum
        }])
    }

    return (
        <div className={styles.all}>
            <div className={styles.header}>
            </div>
            <div className={styles.main}>
                <h2 className={styles.create_room_title}> 방 만들기 </h2>
                <p className={styles.create_room_description}> 당신의 가치를 공유하세요! </p>
                <p className={styles.create_room_option}> 방 이름 </p>
                <input onChange={(e) => setRoomName(e.target.value)} className={styles.form_style}></input>
                <p className={styles.create_room_option}> 방 설명 </p>
                <textarea className={styles.create_textarea} rows="4" cols="50" onChange={(e) => setRoomDescription(e.target.value)}></textarea>
                <div className={styles.max_num_div}>
                    <p className={styles.create_room_option}> 최대 멘티 수용 인원 </p>
                    <input type="number" className={styles.small_form_style} onChange={(e) => setMaxNum(parseInt(e.target.value))}></input>
                </div>
                <div className={styles.check_box_div}>
                    <input
                        type="checkbox"
                        className={styles.check_box}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />
                    <label> (필수) 서비스 이용약관에 동의합니다 </label>
                </div>
                <div className={styles.check_box_div}>
                    <input
                        type="checkbox"
                        className={styles.check_box}
                        onChange={(e) => setAgreeTerms2(e.target.checked)}
                    />
                    <label> (필수) 개인정보 처리방침에 동의합니다 </label>
                </div>
                <div className={styles.check_box_div}>
                    <input type="checkbox" />
                    <label> (선택) 마케팅 정보 수신에 동의합니다 </label>
                </div>
                <button className={styles.submit_button}>
                    <p className={styles.submit_button_p} onClick={submitted}> 방 만들기 </p>
                </button>
                <button className={styles.submit_button} onClick={() => router.push('./chatroom')}>
                    <p className={styles.submit_button_p}> 뒤로 가기 </p>
                </button>
            </div>
        </div>
    )
}

export default CreateRoom
export { CreateRoom }