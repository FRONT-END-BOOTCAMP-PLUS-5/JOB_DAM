'use client'
import style from "./nondata.module.scss"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-08
 * */
export default function NonData(){
  return (
    <main className={style.container}>
      <h2>데이터가 없어요....</h2>
      <div>찾아볼려고 했는데 없네요<span>👨‍💻💦</span></div>
    </main>
  );
};