'use client'
import style from "./fileImage.module.scss"
import Image from 'next/image';
import trash from '@/app/public/images/trash.svg';

interface IProps {
  previewUrls: string[]
  onRemove: (idx: number) => void
}

export default function FileImage({ previewUrls, onRemove }: IProps){
  return (
    <section className={style.container}>
      <div className={style.img_box}>
        {
          previewUrls.map((url, idx) => {
            return (
              <div className={style.img_wrap} key={idx}>
                <img className={style.img} src={url}/>
                <Image alt='제거하기' src={trash} className={style.img_delete} width={18} height={18} onClick={() => onRemove(idx)}/>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};