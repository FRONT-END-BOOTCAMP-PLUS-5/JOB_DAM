"use client"

import styles from '../components/CreateRoom.module.scss'
import { useState } from 'react'

const CreateRoom = () => {
    const [roomName, setRoomName] = useState<string>('');
    const [roomDescription, setRoomDescription] = useState<string>('');
    const [mentorDescription, setMentorDescription] = useState<string>('');
    const [maxNum, setMaxNum] = useState<number>(0);

    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
            </div>
            <div className={styles.main}>
                <h2 className={styles.createRoomTitle}> 방 만들기 </h2>
                <p className={styles.createRoomDescription}> 당신의 가치를 공유하세요! </p>
                <p className={styles.createRoomOption}> 방 이름 </p>
                <input onChange={(e)=>setRoomName(e.target.value)} className={styles.formStyle} ></input>
                <p className={styles.createRoomOption}> 방 설명 </p>
                <textarea className={styles.createTextarea} rows="4" cols="50"></textarea>
                <p className={styles.createRoomOption}> 멘토 설명 </p>
                <input onChange={(e)=>setMentorDescription(e.target.value)} className={styles.formStyle}></input>
                <p className={styles.createRoomOption}> 최대 멘티 수용 인원 </p>
                <input type="number" className={styles.formStyle}></input>
                <button className={styles.submitButton}> 방 만들기 </button>
                <button className={styles.submitButton}> 뒤로 가기 </button>
            </div>
        </div>
    )
}

export { CreateRoom }