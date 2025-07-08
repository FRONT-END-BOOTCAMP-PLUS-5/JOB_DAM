'use client'
import { Ref } from "react"
import style from "./input.module.scss"

interface Props{
    type: string
    typeStyle: string | 'search'
    placeholder?: string
    ref?:  Ref<HTMLInputElement> | undefined
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ type, typeStyle, placeholder, ref, onChange }: Props){
    return <input className={style[typeStyle]}
                  type={type}
                  ref={ref}
                  placeholder={placeholder}
                  onChange={onChange}/>
}

