'use client'
import style from "./board.module.scss"
import { useEffect, useState, useRef } from "react"
import Button from "../components/common/Button/index"
import Input from "../components/board/Input/index"
import Profile from "../components/common/Profile/index"
import Skeleton from "../components/common/Skeleton/index"
import NonData from '@/app/components/common/NonData';
import Aside from '@/app/components/board/Aside';
import usePagination from "@/app/hooks/usePagination";
import {formatTimeAgo} from "@/app/utils/board/date";
import { getLastName } from '@/app/utils/board/name';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Slide, toast, ToastContainer } from 'react-toastify';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-04
 * */

export interface IProps {
    id: number
    memberId: string
    title: string
    content: string
    createdAt: string
    deletedAt?: string
    updatedAt?: string
    categoryId: number
    likeNum: number
    dislikeNum: number
    view: number
    member: {
        id: string
        name: string | null
        img: string | null
        nickname: string | null
    }
}

export default function Board(){
    const [getJson, setJson] = useState<IProps[]>([])
    const [activeBtn, setActiveBtn] = useState('latest')
    const [loading, setLoading] = useState(true)
    const inputRef = useRef(null)
    const inputValRef = useRef<string | null>('')
    const textRef = useRef('created_at')

    const member = useSelector((state: RootState) => state.login.member);

    const router = useRouter()

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
        setLoading(true)
        goToPage(pageNum['current'])
    }

    // input search 할때 데이터
    const handleSearch = (evt:React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = evt['target']['value']
        inputValRef['current'] = inputVal
    }

    const handleKeyPress = (evt:React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.code === 'Enter') handleInput()
    }

    const handleInput = () => {
        init()
        getboardData()
    }

    // 최신순,인기순 버튼 누를때 style 하고 api 실행해서 해당 페이지 데이터 보여줌
    const handleChangeActive = (type: string) => {
        textRef['current'] = type === 'latest' ? 'created_at' : 'like_num'

        setActiveBtn(type)
        getboardData(type, textRef['current'])
    }


    const goToWritePage = () => {
        if(member.id){
            router.push('/board/write')
        }else{
            toast.error('로그인 후 이용가능 합니다.', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "light",
                transition: Slide,
                toastId: 1
            });
            return
        }

    }


    const getboardData = async (url: string = `${activeBtn}`, keyword:string =`${textRef['current']}`) => {
        if(keyword === "like_num") url = "popular"

        const hangle = inputValRef['current']
        const res = await fetch(`/api/question/search?${url}=${keyword}&q=${hangle}`, { next: { revalidate: 3600 } })
        const { result } = await res.json()
        if(result){
            const questions = [...result['question']]
            const lastPg = Math.ceil(questions['length'] / 5)
            lastPage['current'] = lastPg
            setJson(questions)
        }


        setLoading(false)
    }

    const goToItem = (id: number) => {
        router.push(`/board/${id}`)
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
                                <Button type={'ask'}  text={'질문하기'} icon={'✏️'} onClick={() => {goToWritePage()}}/>
                            </div>
                            <div className={style.search_box_middle}>
                                <Input typeStyle={'search'}
                                       type={'text'}
                                       placeholder={"궁금한 내용을 검색해보세요"}
                                       ref={inputRef}
                                       onChange={(evt:React.ChangeEvent<HTMLInputElement>) => {handleSearch(evt)}}
                                       onKeyPress={(evt: React.KeyboardEvent<HTMLInputElement>) => {handleKeyPress(evt)}}
                                />
                                <Button type={'search'}
                                        text={'검색'}
                                        icon={'🔍'}
                                        onClick={() => {handleInput()}}/>
                            </div>
                            <div className={style.search_box_bottom}>
                                <Button type={'tag'} typeStyle={activeBtn === 'latest' ? 'active' : ''} onClick={() => {handleChangeActive('latest')}} text={'최신순'}/>
                                <Button type={'tag'} typeStyle={activeBtn === 'popular' ? 'active' : ''} onClick={() => {handleChangeActive('popular')}} text={'인기순'}/>
                            </div>
                        </section>
                        <section className={style.question_box}>
                                {loading ? new Array(5).fill(1).map((_, idx) => {
                                    return (
                                      <Skeleton key={idx}
                                                top={true}
                                                middle={true}
                                                bottom={true}
                                                profile={true}
                                                containerName={'board_container'}
                                                typeStyle={'board'}/>
                                      )
                                    }) : currentItems.length ? (
                                      currentItems.map((item:IProps) => {
                                          return (
                                            <div key={item.id} className={style.question} onClick={() => {
                                                const id = item.id
                                                goToItem(id)
                                            }}>
                                                <h3 className={style.question_title}>{item.title}</h3>
                                                <div className={style.question_sub_box}>
                                                    <span>👍{item.likeNum}</span>
                                                    <span>👁️{item.view}<span>조회</span></span>
                                                </div>
                                                <p className={style.content}>{item.content}</p>
                                                <div className={style.question_bottom}>
                                                    <div className={style.profile_box}>
                                                        {
                                                            item.member.img ? <Profile img={item.member.img}/> :
                                                              <Profile text={getLastName(item.member.nickname as string)}/>
                                                        }

                                                        <span className={style.nickname}>{item.member.nickname}</span>
                                                    </div>
                                                    <span className={style.date}>{formatTimeAgo(item.createdAt)}</span>
                                                </div>
                                            </div>
                                          )
                                      })
                                ): <NonData/>}
                        </section>
                        <div className={style.button_container}>
                            {currentItems.length != 0 && <Button text={"<"}
                                                               type={"previous"}
                                                               typeStyle={"pagination"}
                                                               disabled={currentPage <= 5}
                                                               onClick={() => {
                                                                   pageNum['current'] -= 5
                                                                   goToPreviousPage()}}/>
                            }
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
                            {currentItems.length != 0 && <Button text={">"}
                                                            type={"next"}
                                                            typeStyle={"pagination"}
                                                            disabled={pageNum['current']+5 > lastPage['current']}
                                                            onClick={() => {
                                                                pageNum['current'] += 5
                                                                goToNextPage()}}/>

                            }
                        </div>
                    </section>
                </section>
                <aside className={style.container_content_right}>
                    <Aside />
                </aside>
                <ToastContainer/>
            </div>
        </main>
    )
}



