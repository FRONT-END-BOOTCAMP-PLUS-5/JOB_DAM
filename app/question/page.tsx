'use client'
import { useEffect, useState } from "react"

interface Item{
    id:number
    title: string
    content: string
    memberId: string
    categoryId: number
    createdAt: string
    updatedAt?: string
    deletedAt?: string
}

export default function Question() {
    const [getJson, setJson] = useState([])
    const postTest = async () => {
        const res = await fetch('api/question')
        const { result } = await res.json()
        const questions = result['question']
        setJson(questions)
    }
    useEffect(() => {
        postTest()
    },[])

    return <div>{
        getJson.map((item:Item) => {
            return <ul key={item.id}>
                <li>{item.id}</li>
                <li>{item.title}</li>
                <li>{item.content}</li>
                <li>{item.memberId}</li>
                <li>{item.createdAt}</li>
            </ul>
        })
    }</div>;
}
