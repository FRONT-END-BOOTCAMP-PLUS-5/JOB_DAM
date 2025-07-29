'use client';

import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CategoryBox from './components/StartPage/CategoryBox';
import { categories } from './constants/main';
import { mainData } from './services/main/main';

function StartPage() {
  const [pageState, setPageState] = useState({
    멤버수: 0,
    질문수: 0,
    멘토수: 0,
    멘토링방수: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await mainData();
      setPageState({
        멤버수: data.memberNum,
        질문수: data.questionNum,
        멘토수: data.mentorNum,
        멘토링방수: data.mentorRoomNum,
      });
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.up}>
        <section className={styles.up_left}>
          <h1>
            당신의 커리어 여정을 <br />
            함께 나아가세요
          </h1>
          <p>
            전문가 멘토링부터 실무 Q&A까지, <br />
            성장하는 개발자들의 든든한 파트너가 되어드립니다.
          </p>
          <div className={styles.up_left_flex}>
            <Link href="/login" className={styles.up_left_start}>
              🚀 시작하기
            </Link>
            <Link href="/board" className={styles.up_left_go_to_community}>
              💬 커뮤니티 둘러보기
            </Link>
          </div>
        </section>
        <section className={styles.up_right}>
          <h2 className={styles.current}> 📊 실시간 현황 </h2>
          <div className={styles.current_option_div}>
            {Object.entries(pageState).map(([key, value], index) => (
              <div className={styles.current_option} key={index}>
                <div className={styles.current_option1}>
                  <h1 className={styles.current_number}> {value} </h1>
                  <p className={styles.current_description}> {key} </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className={styles.jobdam_description_div}>
        <h1 className={styles.why_jobdam}> 왜 Job담을 선택해야할까요? </h1>
        <p className={styles.jobdam_description}>
          개발자의, 개발자에 의한, 개발자를 위한 플랫폼으로 <br />더 나은 커리어를 만들어가세요
        </p>
      </section>
      <div>
        <section className={styles.up_three_boxes}>
          {categories.slice(0, 3).map((category, index) => (
            <CategoryBox key={index} logo={category.logo} title={category.title} description={category.description} />
          ))}
        </section>
        <section className={styles.down_three_boxes}>
          {categories.slice(3, 6).map((category, index) => (
            <CategoryBox key={index} logo={category.logo} title={category.title} description={category.description} />
          ))}
        </section>
        <div className={styles.bottom}>
          <p className={styles.bottom_bold_p}> 지금 바로 시작하세요 </p>
          <p className={styles.bottom_p}>
            수천 명의 개발자들이 이미 Job담과 함께 성장하고 있습니다. <br />
            당신도 지금 바로 합류해보세요!
          </p>
          <nav className={styles.bottom_start_now_nav}>
            <Link href="/login" className={styles.bottom_start_now}>
              🚀무료로 시작하기
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default StartPage;
