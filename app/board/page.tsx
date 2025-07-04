'use client'
import { useEffect, useState } from "react"
import style from "./board.module.scss"

export default function Board(){
    return (
        <main className={style.container}>
            <div className={style.container_content}>
                <section className={style.container_content_left}>
                    <section className={style.container_content_left_top}>
                        <h1>Q&A 커뮤니티</h1>
                        <sub>현직자들과 함께 취업 고민을 해결해보세요</sub>
                    </section>
                    <section className={style.container_content_left_bottom}>

                    </section>
                </section>
                <aside className={style.container_content_right}>
                    2
                </aside>
            </div>
        </main>
    )
}


//
// interface Item{
//     id:number
//     title: string
//     content: string
//     memberId: string
//     categoryId: number
//     createdAt: string
//     updatedAt?: string
//     deletedAt?: string
// }
//
// export default function Question() {
//     const [getJson, setJson] = useState([])
//     const postTest = async () => {
//         const res = await fetch('api/question')
//         const { result } = await res.json()
//         const questions = result['question']
//         setJson(questions)
//     }
//     useEffect(() => {
//         postTest()
//     },[])
//
//     return <main>{
//         getJson.map((item:Item) => {
//             return <ul key={item.id}>
//                 <li>{item.id}</li>
//                 <li>{item.title}</li>
//                 <li>{item.content}</li>
//                 <li>{item.memberId}</li>
//                 <li>{item.createdAt}</li>
//             </ul>
//         })
//     }</main>;
// }
