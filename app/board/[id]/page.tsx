'use client'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import style from "./boarditem.module.scss";
import Aside from "@/app/components/board/Aside";
import {getLastName} from "@/app/utils/board/name";
import Profile from "@/app/components/common/Profile";
import {formatDate} from "@/app/utils/board/date";
import Input from '@/app/components/board/Input';
import Button from '@/app/components/common/Button';

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


export default function Item(){
  const [getItem, setItem] = useState<Item>()
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams();
  const { id } = params;




  useEffect(() => {
    async function getItem(){
      const response = await fetch(`/api/question/item?id=${id}`)
      const json = await response.json()
      const item = json['result']['questionItem'][0]
      setItem(item)
      setIsLoading(false)
    }

    getItem()
  },[])

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
                  <div className={style.other_chat}>
                    <div>반갑습니다 ㅎㅇ</div>
                  </div>
                  <div className={style.my_chat}>
                    <div>안녕하세요</div>
                  </div>
                </div>
              </section>
              <div className={style.button_container}>
                <Input typeStyle={'search'}
                       type={'text'}
                       placeholder={"채팅내용을 입력하세요"}
                />
                <Button type={'send'} text={'🚀 보내기'}/>
              </div>
            </section>
          </section>
          <aside className={style.container_content_right}>
            <Aside />
          </aside>
        </div>
      </main>
  );
};