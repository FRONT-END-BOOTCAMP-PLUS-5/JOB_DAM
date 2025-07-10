'use client'
import Image from 'next/image';
import style from "./profile.module.scss"
import Props from "./interface"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-08
 * */
export default function Profile ({ img='', text }:Props) {
    return (
        <>
            {
                img ? <Image alt="프로필 사진" src={img} width={38} height={38}/> : <span className={style.blank_img}>{text}</span>
            }
        </>
    );
};