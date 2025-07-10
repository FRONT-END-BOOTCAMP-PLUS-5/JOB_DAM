import { useState, useEffect } from "react"
import { JsonType } from './interface';
import style from "./aside.module.scss"
import { getLastName } from '@/app/utils/name';
import Profile from '@/app/components/Profile';
import Skeleton from '@/app/components/Skeleton';

/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */
export default function Aside(){
  const [getJson, setJson] = useState<JsonType[]>([])
  const [loading, setLoading] = useState(true)

  const getAllMemberData = async () => {
    const res = await fetch('api/member', { next: { revalidate: 3600 } })
    const { result } = await res.json()
    const members = [...result['member']]

    setJson(members)
    setLoading(false)
  }

  useEffect(() => {
    getAllMemberData()
  }, [])

  return (
    <>
      <h4 className={style.title}>🏆 이주의 멘토</h4>
      { loading  && new Array(5).fill(1).map((_, idx) => {
        return (
          <Skeleton key={idx}
                    top={true}
                    middle={false}
                    bottom={false}
                    profile={false}
                    containerName={'aside_container'}
                    typeStyle={'aside'}/>
          )
        })
      }
      { !loading && getJson.map((item:JsonType) => {
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
                <span className={style.position}>네이버 - 시니어 개발자</span>
              </div>
              <span className={style.grade}>{item.grade}</span>
            </div>
          )
        })
      }
    </>
  );
};