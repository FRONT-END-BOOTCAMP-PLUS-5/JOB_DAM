'use client'
import style from "./board.module.scss"
import { useEffect, useState, useRef } from "react"
import { JsonType } from "./interface"
import Button from "../components/Button/index"
import Input from "./index"
import Profile from "../components/Profile/index"
import usePagination from "@/app/hooks/usePagination";
import {formatTimeAgo} from "@/app/utils/date";
/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */

export default function Board(){
    const [getJson, setJson] = useState<JsonType[]>([])
    const [activeBtn, setActiveBtn] = useState('latest')
    const inputRef = useRef(null)
    const inputValRef = useRef<string | null>('')
    const textRef = useRef('created_at')


    const {
        currentItems,
        currentPage,
        pageNum,
        lastPage,
        goToPage,
        goToNextPage,
        goToPreviousPage
    } = usePagination(getJson, 5)

    // 초기화 데이터
    const init = () => {
        pageNum['current'] = 1
        lastPage['current'] = 5
        setJson([])
        goToPage(pageNum['current'])
    }

    // input search 할때 데이터
    const handleSearch = (evt:React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = evt['target']['value']
        inputValRef['current'] = inputVal
    }


    // 최신순,인기순 버튼 누를때 style 하고 api 실행해서 해당 페이지 데이터 보여줌
    const handleChangeActive = (type: string) => {
        textRef['current'] = type === 'latest' ? 'created_at' : 'recommend'

        setActiveBtn(type)
        getboardData(type, textRef['current'])
    }




    const getboardData = async (url: string = `${activeBtn}`, keyword:string =`${textRef['current']}`) => {
        if(keyword === "recommend") url = "popular"

        const hangle = inputValRef['current']
        const res = await fetch(`api/question/${url}=${keyword}&search=${hangle}`, { next: { revalidate: 3600 } })
        const { result } = await res.json()
        const questions = [...result['question']]
        const lastPg = Math.ceil(questions['length'] / 5)
        lastPage['current'] = lastPg
        setJson(questions)
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
                                    총 <span className={style.search_box_total_question}>{getJson.length}</span>개의 질문
                                </span>
                                <Button type={'ask'}  text={'질문하기'} icon={'✏️'}/>
                            </div>
                            <div className={style.search_box_middle}>
                                <Input typeStyle={'search'}
                                       type={'text'}
                                       placeholder={"궁금한 내용을 검색해보세요"}
                                       ref={inputRef}
                                       onChange={(evt:React.ChangeEvent<HTMLInputElement>) => {handleSearch(evt)}}/>
                                <Button type={'search'}
                                        text={'검색'}
                                        icon={'🔍'}
                                        onClick={() => {
                                            init()
                                            getboardData()
                                            }}/>
                            </div>
                            <div className={style.search_box_bottom}>
                                <Button type={'tag'} typeStyle={activeBtn === 'latest' ? 'active' : ''} onClick={() => {handleChangeActive('latest')}} text={'최신순'}/>
                                <Button type={'tag'} typeStyle={activeBtn === 'popular' ? 'active' : ''} onClick={() => {handleChangeActive('popular')}} text={'인기순'}/>
                            </div>
                        </section>
                        <section className={style.question_box}>
                                {currentItems.map((item:JsonType) => {
                                    return (
                                        <div key={item.id} className={style.question}>
                                            <h3 className={style.question_title}>{item.title}</h3>
                                            <div className={style.question_sub_box}>
                                                <span>👍{item.recommend}</span>
                                                <span>👁️{item.view}<span>조회</span></span>
                                            </div>
                                            <p className={style.content}>{item.content}</p>
                                            <div className={style.question_bottom}>
                                                <div>
                                                    <Profile/>
                                                    <span className={style.nickname}>{item.member.nickname}</span>
                                                </div>
                                                <span className={style.date}>{formatTimeAgo(item.createdAt)}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                        </section>
                        <div className={style.button_container}>
                            <Button text={"<"}
                                    type={"previous"}
                                    typeStyle={"pagination"}
                                    disabled={currentPage <= 5}
                                    onClick={() => {
                                        pageNum['current'] -= 5
                                        goToPreviousPage()}}/>
                            {
                                new Array(5).fill(1).map((_, idx) => {
                                    return idx + pageNum['current'] <= lastPage['current'] && (
                                                <Button key={idx+pageNum['current']}
                                                            text={`${idx+pageNum['current']}`}
                                                            type={'pagination'}
                                                            typeStyle={`${currentPage === idx+pageNum['current'] ? 'focus' : ''}`}
                                                            onClick={() => {
                                                                goToPage(idx+pageNum['current'])
                                                            }}
                                                />
                                    )
                                })
                            }
                            <Button text={">"}
                                    type={"next"}
                                    typeStyle={"pagination"}
                                    disabled={pageNum['current']+5 > lastPage['current']}
                                    onClick={() => {
                                        pageNum['current'] += 5
                                        goToNextPage()}}/>
                        </div>
                    </section>
                </section>
                <aside className={style.container_content_right}>
                    2
                </aside>
            </div>
        </main>
    )
}



