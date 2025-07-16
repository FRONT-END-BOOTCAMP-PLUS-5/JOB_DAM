'use client'
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation'
import style from "./boarditem.module.scss";
import {getLastName} from "@/app/utils/board/name";
import Profile from "@/app/components/common/Profile";
import {formatDate} from "@/app/utils/board/date";
import Input from '@/app/components/board/Input';
import Button from '@/app/components/common/Button';
import { createClient } from '@/app/utils/supabase/client';
import AsidePicture from '@/app/components/board/AsidePicture';
import BoardItemModal from '@/app/components/board/Modal';
import LikeDisLike from "@/app/components/board/LikeDisLike";

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
  memberId: string
  questionId: number
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}

const ID = "1a9d99ce-1c9f-4272-b140-c4921ee77794"
export default function Item(){
  const supabase = createClient()
  const [getItem, setItem] = useState<Item>()
  const [getComment, setComment] = useState<Json[]>([])
  const commentRef = useRef<HTMLLIElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSendLoading, setSendIsLoading] = useState(false)
  const [isModal, setIsModal] = useState({
    open: false,
    img: ''
  })

  const params = useParams();
  const { id } = params;


  const imgArrRef = useRef<string[] | null>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const inputValRef = useRef<string | null>('')

  //내일 로그인한 유저하고 다른유저일때 확인하는거 코드 작성해야함!

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

  const sendMessage = async () => {
    if(!inputValRef['current']) return

    setSendIsLoading(true)
    const formData = new FormData()
    formData.append("content", `${inputValRef['current']}`)
    formData.append("memberId", "1a9d99ce-1c9f-4272-b140-c4921ee77794") //테스트 계정
    formData.append("question_id",  `${id}`)
    await fetch(`/api/question/item/chat?item=${id}`, {
      method: "POST",
      body: formData,
    })
    inputValRef['current'] = ''
    if(inputRef['current']) inputRef['current'].value = ''
    setSendIsLoading(false)
    toBottom()
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

 useEffect(() => {
    async function getItem(){
      const response = await fetch(`/api/question/item?id=${id}`)
      const json = await response.json()
      const item = json['result']['questionItem'][0]
      const view = item['view']
      imgArrRef['current'] = []

      for(let i=0; i<3; i++) imgArrRef['current']?.push(item[`img${i+1}`])
      setItem(item)
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
  }, [getComment])

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
                      isLoading ? <></> : <Profile text={getLastName(getItem?.member.nickname as string)}/>
                    }
                    <p className={style.nickname_text}>{getItem?.member.nickname}</p>
                    <p className={style.date_text}>{formatDate(getItem?.createdAt || '')}</p>
                  </div>
                  <div className={style.item_box}>
                    <div className={style.item_title}>
                      <sub>
                        {getItem?.title}<br/>
                        <p>{getItem?.content}</p>
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
                      return (
                        item.memberId === ID ? <ul key={item.id} className={style.my_chat} >
                          <li ref={commentRef}>{item.content}</li>
                        </ul> : <ul key={item.id} className={style.other_chat}>
                                  <li ref={commentRef} >{item.content}</li>
                                </ul>
                      )
                    })
                  }
                </div>
              </section>
              <div className={style.button_container}>
                <Input typeStyle={'send'}
                       type={'text'}
                       ref={inputRef}
                       onChange={(evt:React.ChangeEvent<HTMLInputElement>) => {handleSearch(evt)}}
                       placeholder={"내용을 입력하세요"}
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
              <LikeDisLike id={id}/>
            </section>
          </section>
          <aside className={style.container_content_right}>
            <AsidePicture img={imgArrRef['current']} setIsModal={setIsModal}/>
          </aside>
        </div>
        {
          isModal && <BoardItemModal isModal={isModal} setIsModal={setIsModal}/>
        }
      </main>
  );
};