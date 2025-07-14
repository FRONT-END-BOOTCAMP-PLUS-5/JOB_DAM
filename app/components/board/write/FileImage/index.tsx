'use client'
import style from "./fileimage.module.scss"

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
                <img src={'/images/trash.svg'} className={style.img_delete} width={18} onClick={() => onRemove(idx)}/>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};