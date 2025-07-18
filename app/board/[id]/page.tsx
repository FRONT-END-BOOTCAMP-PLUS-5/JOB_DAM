'use client'
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation'
import style from "./boarditem.module.scss";
import dayjs from 'dayjs';
import {getLastName} from "@/app/utils/board/name";
import Profile from "@/app/components/common/Profile";
import {formatDate} from "@/app/utils/board/date";
import Input from '@/app/components/board/Input';
import Button from '@/app/components/common/Button';
import { createClient } from '@/app/utils/supabase/client';
import AsidePicture from '@/app/components/board/AsidePicture';
import BoardItemModal from '@/app/components/board/Modal';
import LikeDisLike from "@/app/components/board/LikeDisLike";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Slide, toast, ToastContainer } from 'react-toastify';

interface Item{
    catergoryId: number | null
    content: string
    title: string
    id: number
    createdAt: string
    member: {
        id: string
        name: string | null
        img: string | null
        nickname: string | null
    }

}

interface Json{
    id: number
    content: string
    memberId: {
        id: string
        nickname: string
        name: string
        img: string
    }
    questionId: number
    createdAt: string
    updatedAt: string | null
    deletedAt: string | null
}

export default function Item(){
    const supabase = createClient()
    const [getComment, setComment] = useState<Json[]>([])
    const commentRef = useRef<HTMLLIElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSendLoading, setSendIsLoading] = useState(false)
    const [isModal, setIsModal] = useState({
        open: false,
        img: ''
    })

    const member = useSelector((state: RootState) => state.login.member);


    const params = useParams();
    const { id } = params;


    const itemRef = useRef<Item>(null)
    const imgArrRef = useRef<string[] | null>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const inputValRef = useRef<string | null>('')


    const handleSearch = (evt:React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = evt['target']['value']
        inputValRef['current'] = inputVal
    }

    const handleInput = () => {
        sendMessage()
    }

    const handleKeyPress = (evt:React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.code === 'Enter') handleInput()
    }

    const getAllMessages = async () => {
        const response = await fetch(`/api/question/item/chat?item=${id}`, { next: { revalidate: 3600 } })
        const json = await response.json()
        const copyJson = [...json['result']['answer']]
        setComment(copyJson)
    }

    const sendMessage = () => {
        if(!inputValRef['current']) return

        setSendIsLoading(true)
        const formData = new FormData()
        formData.append("content", `${inputValRef['current']}`)
        formData.append("memberId", member.id)
        formData.append("question_id",  `${id}`)
        fetch(`/api/question/item/chat?item=${id}`, {
            method: "POST",
            body: formData,
        })
        inputValRef['current'] = ''
        if(inputRef['current']) inputRef['current'].value = ''
        setSendIsLoading(false)
    }


    const toBottom = () => {
        commentRef.current?.scrollIntoView({ block: 'end', inline: 'nearest' })
    }


    const setBoardView = (view: number) => {
        const formData = new FormData()


        formData.append('view', view.toString())
        formData.append('question_id',`${id}`)
        fetch(`/api/question/item/view?item=${id}`, {
            method: "POST",
            body: formData,
        })
    }

    const handleCloseToast = (text: string) => {
        toast.error(text, {
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
    }


    useEffect(() => {
        async function getItem(){
            const response = await fetch(`/api/question/item?id=${id}`)
            const json = await response.json()
            const item = json['result']['questionItem'][0]
            const view = item['view']
            imgArrRef['current'] = []

            for(let i=0; i<3; i++) imgArrRef['current']?.push(item[`img${i+1}`])
            itemRef['current'] = item
            setBoardView(view)
            setIsLoading(false)
        }
        getItem()
        getAllMessages()

        const channel = supabase.channel(`board-item-${id}`)
            .on('postgres_changes',{
                event: 'INSERT',
                schema: 'public',
                table: 'answer'
            }, payload => {
                if(payload.eventType === 'INSERT' &&
                    !payload.errors){
                    getAllMessages()
                }
            }).subscribe()

        return () => {
            channel.unsubscribe()
        }
    }, [])

    useEffect(() => {
        toBottom()
    },[getComment])


    return (
        <main className={style.container}>
            <div className={style.container_content}>
                <section className={style.container_content_left}>
                    { isLoading ?
                        <div className={style.container_content_left_top}>
                            <div className={style.item_title} style={{textAlign: 'center'}}>
                                🤔음 질문이 뭐였지<span className={style.dot1}></span>
                                <span className={style.dot2}></span>
                                <span className={style.dot3}></span>
                            </div>
                        </div>:
                        <section className={style.container_content_left_top}>
                            <div className={style.profile}>
                                {
                                    isLoading ? <></> : itemRef.current?.member.img ? <Profile img={itemRef.current?.member.img}/> :<Profile text={getLastName(itemRef.current?.member.nickname as string)}/>
                                }
                                <p className={style.nickname_text}>{itemRef.current?.member.nickname}</p>
                                <p className={style.date_text}>{formatDate(itemRef.current?.createdAt || '')}</p>
                            </div>
                            <div className={style.item_box}>
                                <div className={style.item_title}>
                                    <sub>
                                        {itemRef.current?.title}<br/>
                                        <p>{itemRef.current?.content}</p>
                                    </sub>
                                </div>
                            </div>
                        </section>
                    }

                    <section className={style.container_content_left_bottom}>
                        <section className={style.chat_box}>
                            <div className={style.chat}>
                                {
                                    getComment.map((item) => {
                                        const date = dayjs(item.createdAt, "YYYY-MM-DD HH:mm:ss")
                                        const year = date.format("YYYY년MM월DD일")
                                        const time = date.format("HH:mm:ss")
                                        return (
                                            item.memberId.id === member.id ? <ul key={item.id} className={style.my_chat} >
                                                <li ref={commentRef}>
                                                    <div>
                                                        <div className={style.chat_box}>
                                                            <span>{item.content}</span>
                                                        </div>
                                                        <span className={style.date}>{year}<br/>{time}</span>
                                                    </div>
                                                    {
                                                        member.img ? <div className={style.user}>
                                                                <Profile img={member.img}/>
                                                                <span className={style.nickname}>{member.nickname}</span>
                                                            </div>:
                                                            <div className={style.user}>
                                                                <Profile text={getLastName(member.nickname)}/>
                                                                <span className={style.nickname}>{member.nickname}</span>
                                                            </div>
                                                    }
                                                </li>

                                            </ul> : <ul key={item.id} className={style.other_chat}>
                                                <li ref={commentRef} >
                                                    {
                                                        item.memberId.img ? <div className={style.user}>
                                                                <Profile img={item.memberId.img}/>
                                                                <span className={style.nickname}>{item.memberId.nickname}</span>
                                                            </div>:
                                                            <div className={style.user}>
                                                                <Profile text={getLastName(item.memberId.nickname as string)}/>
                                                                <span className={style.nickname}>{item.memberId.nickname}</span>
                                                            </div>
                                                    }
                                                    <div>
                                                        <div className={style.other_chat_box}>
                                                            <span>{item.content}</span>
                                                        </div>
                                                        <span className={style.date}>{year}<br/>{time}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </section>
                        <div className={style.button_container}>
                            <Input typeStyle={member.id ? 'send' : 'not_send'}
                                   type={'text'}
                                   ref={inputRef}
                                   disabled={!member.id}
                                   onChange={(evt:React.ChangeEvent<HTMLInputElement>) => {handleSearch(evt)}}
                                   placeholder={member.id ? "내용을 입력하세요" : "로그인 후 사용이 가능합니다"}
                                   onKeyPress={(evt: React.KeyboardEvent<HTMLInputElement>) => {handleKeyPress(evt)}}
                            />
                            {
                                isSendLoading ? <div className={style.loading_btn}>
                                        <span className={style.btn_text_dot1}></span>
                                        <span className={style.btn_text_dot2}></span>
                                        <span className={style.btn_text_dot3}></span>
                                    </div> :
                                    <Button type={'send'}
                                            text={'🚀 보내기'}
                                            onClick={() => {handleInput()}}/>
                            }
                        </div>
                        <LikeDisLike id={id} handleCloseToast={handleCloseToast}/>
                    </section>
                </section>
                <aside className={style.container_content_right}>
                    <AsidePicture img={imgArrRef['current']} setIsModal={setIsModal}/>
                </aside>
            </div>
            {
                isModal && <BoardItemModal isModal={isModal} setIsModal={setIsModal}/>
            }
            <ToastContainer />
        </main>
    );
};