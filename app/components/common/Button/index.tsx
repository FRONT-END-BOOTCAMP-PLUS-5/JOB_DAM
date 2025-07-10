'use client';
import style from './button.module.scss';
import Props from './interface';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-05
 * */

export default function Button({ text, type, typeStyle = '', icon, disabled, onClick }: Props) {
  return (
    <button className={`${style[type]} ${style[typeStyle]}`} disabled={disabled} onClick={onClick}>
      {icon ? <span className={style.icon}>{icon}</span> : <></>}
      <span className={style.text}>{text}</span>
    </button>
  );
}
