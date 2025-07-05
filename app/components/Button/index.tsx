'use client'
import style from "./button.module.scss"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-05
 * */
interface Props{
    text: string
    icon?: string
    type: string
    typeStyle?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ text, type, typeStyle='', icon, onClick }: Props){

    return (
        <button className={`${style[type]} ${style[typeStyle]}`} onClick={onClick}>
            { icon ? <span className={style.icon}>{icon}</span> : <></>}
            <span className={style.text}>{text}</span>
        </button>
    )
}