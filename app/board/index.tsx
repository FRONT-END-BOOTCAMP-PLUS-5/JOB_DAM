'use client'
import style from "./input.module.scss"

interface Props{
    type: string
    typeStyle: string | 'search'
    placeholder?: string
}

export default function Input({ type, typeStyle, placeholder }: Props){
    return <input className={style[typeStyle]} type={type} placeholder={placeholder}/>
}

