'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import style from "./asidePicture.module.scss"
import Skeleton from '@/app/components/common/Skeleton';
import NonData from "@/app/components/common/NonData";
import { getImageUrl } from '@/app/utils/storage/storage';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-09
 * */
interface IProps{
  img: string[] | null
  setIsModal: Dispatch<SetStateAction<{
    open: boolean
    img: string
  }>>
}


export default function AsidePicture({ img, setIsModal }:IProps){
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const check = !img?.length
    setLoading(check)
  },[img?.length])

  return (
    <>
      <h4 className={style.title}>🖼️첨부 사진</h4>
      { loading  ? new Array(3).fill(1).map((_, idx) => {
        return (
          <Skeleton key={idx}
                    top={true}
                    middle={false}
                    bottom={false}
                    profile={false}
                    containerName={'aside_picture_container'}
                    typeStyle={'aside_picture'}/>
          )
        }) : img?.length && img[0] ? img.map((item,idx) => {
          if(item)
          return (
            <div key={idx} className={style.picture_box} onClick={() => {setIsModal({
              open: true,
              img: item
            })}}>
              <img src={getImageUrl(item)} width={250} height={150}/>
            </div>
          )
      }) : <NonData typeStyle={'board'}/>
      }
    </>
  );
};