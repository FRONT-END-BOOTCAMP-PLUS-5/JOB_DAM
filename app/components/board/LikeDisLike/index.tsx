'use client'
import style from "./likeDisLike.module.scss"
import { useState, useEffect } from "react";
import {ParamValue} from "next/dist/server/request/params";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';


interface IProps{
    id:  ParamValue
    handleCloseToast: (text: string) => void
}
export default function LikeDisLike ({ id, handleCloseToast }:IProps){
    const [getLikeDisLikeNum, setLikeDisLkieNum] = useState({
        likeNum: 0,
        disLikeNum: 0
    })
    const [getJson, setJson] = useState({
        id: '',
        title: '',
        content: '',
        likeNum: 0,
        disLikeNum: 0,
        likedQuestion:{
            memberId: '',
            questionId: '',
            likeType: ''
        }
    })

    const member = useSelector((state: RootState) => state.login.member);


    const handleLikeDisLike = async (check: string) => {
        if(member.id){
            const formData = new FormData()
            formData.append("check", check)
            formData.append('likeNum', getJson.likeNum.toString())
            formData.append('dislikeNum', getJson.disLikeNum.toString())
            formData.append('memberId', member.id)
            formData.append('questionId', `${id}`)

            const response = await fetch(`/api/question/item/likedislike?id=${id}`,{
                method: "POST",
                body: formData,
            })

            const json = await response.json()
            if(json['result'].hasOwnProperty('likeNum')){
                setLikeDisLkieNum({
                    likeNum: json['result']['likeNum'],
                    disLikeNum: json['result']['dislikeNum'],
                })
            }else{
                return handleCloseToast(json['result'])
            }
        }else{
            return handleCloseToast('로그인 후 이용가능 합니다.')
        }
        

    }

    const getlikeDisNum = async () => {
        const response = await fetch(`/api/question/item/likedislike?id=${id}`)
        const json = await response.json()
        const result = json['result'][0]
        setJson(result)
    }




    useEffect(() => {
        getlikeDisNum()
    },[getLikeDisLikeNum])

    return (
        <main className={style.container}>
            <button className={style.like_box} onClick={() => {handleLikeDisLike('like')}}>
                <span className={style.like_num}>{getJson.likeNum}</span>
                <span className={style.like}>👍</span>
            </button>
            <button className={style.dislike_box} onClick={() => {handleLikeDisLike('dislike')}}>
                <span className={style.dislike_num}>{getJson.disLikeNum}</span>
                <span className={style.dislike}>👎</span>
            </button>
        </main>
    );
};