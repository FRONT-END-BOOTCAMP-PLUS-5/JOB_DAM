'use client'
import style from "./likeDisLike.module.scss"
import { useState, useEffect } from "react";
import {ParamValue} from "next/dist/server/request/params";

interface IProps{
    id:  ParamValue
}
const memberId = '0a03069e-20a9-4268-8885-03b49adf5593' //테스트 계정
export default function LikeDisLike ({ id }:IProps){
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


    const handleLikeDisLike = async (check: string) => {
        const formData = new FormData()
        formData.append("check", check)
        formData.append('likeNum', getJson.likeNum.toString())
        formData.append('dislikeNum', getJson.disLikeNum.toString())
        formData.append('memberId', memberId)
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
            return alert(json['result'])
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