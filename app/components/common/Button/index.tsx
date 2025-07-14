'use client';
import style from './button.module.scss';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-05
 * */

interface IProps{
  text: string
  icon?: string
  type: string
  typeStyle?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

}

export default function Button({ text, type, typeStyle = '', icon, disabled, onClick }: IProps) {
  return (
    <button className={`${style[type]} ${style[typeStyle]}`} disabled={disabled} onClick={onClick}>
      {icon ? <span className={style.icon}>{icon}</span> : <></>}
      <span className={style.text}>{text}</span>
    </button>
  );
}
