'use client'
import { Ref } from "react"
import style from "./input.module.scss"

interface Props{
    type: string
    typeStyle: string | 'search'
    placeholder?: string
    disabled?: boolean
    ref?:  Ref<HTMLInputElement> | undefined
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (evt: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function Input({ type, typeStyle, placeholder, disabled = false, ref, onChange, onKeyPress }: Props){
    return <input className={style[typeStyle]}
                  type={type}
                  ref={ref}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={onChange}
                  onKeyPress={onKeyPress} />
}

