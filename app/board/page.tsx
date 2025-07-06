'use client'
import style from "./board.module.scss"
import { useEffect, useState } from "react"
import Button from "../components/Button/index"
import Input from "./index"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */


export default function Board(){
    const [getJson, setJson] = useState([])
    const [activeBtn, setActiveBtn] = useState('latest')

    const handleChangeActive = (type: string) => {
        setActiveBtn(type)
    }

    const getboardData = async () => {
        const res = await fetch('api/question')
        const { result } = await res.json()
        console.log(result, "result")
        // const questions = result['question']
        // setJson(questions)
    }

    useEffect(() => {
        getboardData()
    },[])

    
    
    return (
        <main className={style.container}>
            <div className={style.container_content}>
                <section className={style.container_content_left}>
                    <section className={style.container_content_left_top}>
                        <h1>Q&A 커뮤니티</h1>
                        <sub>현직자들과 함께 취업 고민을 해결해보세요</sub>
                    </section>
                    <section className={style.container_content_left_bottom}>
                        <section className={style.search_box}>
                            <div className={style.search_box_top}>
                                <span>
                                    총 <span className={style.search_box_total_question}>{0}</span>개의 질문
                                </span>
                                <Button type={'ask'}  text={'질문하기'} icon={'✏️'}/>
                            </div>
                            <div className={style.search_box_middle}>
                                <Input typeStyle={'search'} type={'text'} placeholder={"궁금한 것을 검색해보세요"}/>
                                <Button type={'search'} text={'검색'} icon={'🔍'}/>
                            </div>
                            <div className={style.search_box_bottom}>
                                <Button type={'tag'} typeStyle={activeBtn === 'latest' ? 'active' : ''} onClick={() => {handleChangeActive('latest')}} text={'최신순'}/>
                                <Button type={'tag'} typeStyle={activeBtn === 'popular' ? 'active' : ''} onClick={() => {handleChangeActive('popular')}} text={'인기순'}/>
                            </div>
                        </section>
                        <section className={style.question_box}>

                        </section>
                    </section>
                </section>
                <aside className={style.container_content_right}>
                    2
                </aside>
            </div>
        </main>
    )
}



