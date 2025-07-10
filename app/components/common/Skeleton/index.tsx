import style from "./skeleton.module.scss"
import Props from '@/app/components/common/Skeleton/interface';
/**
 * 작성자: 김동우
 * 작성일: 2025-07-08
 * */
export default function Skeleton ({ top, middle, bottom, profile, typeStyle, containerName }: Props) {
  return (
    <main className={style[`${containerName}`]}>
      {
       top && <section className={style.top}>
          <div className={style[`${typeStyle}`]}/>
        </section>
      }
      {
        middle && <section className={style.middle}>
          <div className={style[`${typeStyle}`]}/>
        </section>
      }
      {
        bottom && <section className={style.bottom}>
          {/** profile은 section 안에 설정하고 top, middle, bottom 안에 사용하시면 됩니다.*/}
          {profile && <div className={style.profile_container}>
                        <span className={style.profile}/>
                        <span className={style.user}/>
                      </div>}
          <div className={style[`${typeStyle}`]}/>
        </section>
      }
    </main>
  );
};