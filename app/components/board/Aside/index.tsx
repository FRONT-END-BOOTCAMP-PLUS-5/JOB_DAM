'use client'
import { useState, useEffect } from "react"
import style from "./aside.module.scss"
import { getLastName } from '@/app/utils/board/name';
import Profile from '@/app/components/common/Profile';
import Skeleton from '@/app/components/common/Skeleton';
import NonData from "@/app/components/common/NonData";
/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */
interface JsonType {
  id: number
  name: string
  img: string | null
  grade: number
  nickname: string
  member: {
    company: string
    level: string
  }
}
export default function Aside(){
  const [getJson, setJson] = useState<JsonType[]>([])
  const [loading, setLoading] = useState(true)

  const getAllMemberData = async () => {
    const res = await fetch('api/member/rank', { next: { revalidate: 3600 } })
    const { result } = await res.json()
    const members = [...result['member']]
    setJson(members)
    setLoading(false)
  }

  useEffect(() => {
    getAllMemberData()
  },[])

  return (
    <>
      <h4 className={style.title}>🏆 이주의 멘토</h4>
      { loading  ? new Array(5).fill(1).map((_, idx) => {
        return (
          <Skeleton key={idx}
                    top={true}
                    middle={false}
                    bottom={false}
                    profile={false}
                    containerName={'aside_container'}
                    typeStyle={'aside'}/>
          )
        }) : getJson.length ? getJson.map((item:JsonType) => {
        return (
            <div className={style.container} key={item.id}>
              <span>
                <Profile text={getLastName(item.name as string)}/>
              </span>
              <div className={style.company}>
                <span className={style.name}>
                  {item.name}
                  <span className={style.badge}>멘토</span>
                </span>
                <span className={style.position}>{item.member.company}-{item.member.level}</span>
              </div>
              <span className={style.grade}>{item.grade}P</span>
            </div>
        )
      })  : <NonData typeStyle={'board'}/>
      }
    </>
  );
};