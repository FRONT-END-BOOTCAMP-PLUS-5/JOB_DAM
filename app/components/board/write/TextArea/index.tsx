'use client'
import style from "./textarea.module.scss"
import { Ref } from 'react';

interface IProps {
  placeholder?: string
  ref?: Ref<HTMLTextAreaElement>
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({ placeholder, ref, onChange }:IProps){
  return (
    <>
      <textarea ref={ref} className={style.custom_textarea} placeholder={placeholder} onChange={onChange}/>
    </>
  );
};