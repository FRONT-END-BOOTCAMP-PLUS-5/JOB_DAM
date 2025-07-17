"use client"

import styles from './startpage.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { membersNum } from '../services/count/member';
import { questionsNum } from '../services/count/question';
import { mentorsNum } from '../services/count/mentor';
import { chatroomsNum } from '../services/count/chatroom';

const StartPage = () => {
    const [memberNum, setMemberNum] = useState<number>(0);
    const [questionNum, setQuestionNum] = useState<number>(0);
    const [mentorNum, setMentorNum] = useState<number>(0);
    const [mentorRoomNum, setMentorRoomNum] = useState<number>(0);

    useEffect(()=> {
        findMemNum();
        findQuestionNum();
        findMentorNum();
        findMentorRoomNum();
    }, [])

    const findMemNum = async () => {
        const response = await membersNum();
        if (!response) {
            return;
        }
        setMemberNum(response.data.result.length);
    };

    const findQuestionNum = async () => {
        const response = await questionsNum();
        if (!response) {
            return;
        }
        setQuestionNum(response.data.result.length);
    }

    const findMentorNum = async () => {
        const response = await mentorsNum();
        if (!response) {
            return;
        }
        setMentorNum(response.data.result.length);
    }

    const findMentorRoomNum = async () => {
        const response = await chatroomsNum();
        if (!response) {
            return;
        }
        setMentorRoomNum(response.data.result.length);
    }

    return (
        <main>
            <div className={styles.up}>
                <section className={styles.up_left}>
                    <h1 className={styles.d_none}> 홍보 글 </h1>
                    <div className={styles.up_left_h1}>
                        당신의 커리어 여정을 <br />
                        함께 나아가세요
                    </div>
                    <div className={styles.up_left_center}>
                        <div className={styles.up_left_h4}>
                            전문가 멘토링부터 실무 Q&A까지, <br />
                            성장하는 개발자들의 든든한 파트너가 되어드립니다.
                        </div>
                    </div>
                    <nav className={styles.up_left_flex}>
                        <h1 className={styles.d_none}> 시작 메뉴 </h1>
                        <Link href="/login" className={styles.up_left_start}>
                            🚀 시작하기
                        </Link>
                        <Link href="/board" className={styles.up_left_go_to_community}>
                            💬 커뮤니티 둘러보기
                        </Link>
                    </nav>
                </section>
                <section className={styles.up_right}>
                    <h1 className={styles.d_none}> 현재 카테고리별 개수 </h1>
                    <h3 className={styles.current}> 📊 실시간 현황 </h3>
                    <div className={styles.current_first_line}>
                        <div className={styles.current_option}>
                            <p className={styles.current_number}> {memberNum} </p>
                            <p className={styles.current_description}> 멤버 수 </p>
                        </div>
                        <div className={styles.current_option}>
                            <p className={styles.current_number}> {questionNum} </p>
                            <p className={styles.current_description}> 질문 수 </p>
                        </div>
                    </div>
                    <div className={styles.current_first_line}>
                        <div className={styles.current_option}>
                            <p className={styles.current_number}>{mentorNum}</p>
                            <p className={styles.current_description}> 멘토 수 </p>
                        </div>
                        <div className={styles.current_option_room_num}>
                            <p className={styles.current_number}>{mentorRoomNum}</p>
                            <p className={styles.current_description}> 멘토링 방 수 </p>
                        </div>
                    </div>
                </section>
            </div>
            <section className={styles.jobdam_description_div}>
                <h1 className={styles.why_jobdam}> 왜 Job담을 선택해야할까요? </h1>
                <p className={styles.jobdam_description}>
                    개발자의, 개발자에 의한, 개발자를 위한 플랫폼으로 <br />
                    더 나은 커리어를 만들어가세요
                </p>
            </section>
            <div className={styles.six_boxes}>
                <section className={styles.up_three_boxes}>
                    <h1 className={styles.d_none}> 카테고리 목록 </h1>
                    <section className={styles.first_box}>
                        <div className={styles.first_box_logo}> 👨🏻‍💻 </div>
                        <h1 className={styles.first_box_bold_p}> 전문가 멘토링 </h1>
                        <p className={styles.first_box_p}>
                            현업에서 활동하는 시니어 개발자들과 1:1 멘토 <br />
                            링을 통해 실무 경험과 커리어 인사이트를 얻으 <br />
                            세요.
                        </p>
                    </section>
                    <section className={styles.first_box}>
                        <div className={styles.first_box_logo}> 💬 </div>
                        <h1 className={styles.first_box_bold_p}> 실시간 Q&A </h1>
                        <p className={styles.first_box_p}>
                            막힌 부분이 있다면 언제든 질문하세요.커뮤니 <br />
                            티 전문가들이 신속하고 정확한 답변을 제공합 <br />
                            니다. <br />
                        </p>
                    </section>
                    <section className={styles.first_box}>
                        <div className={styles.first_box_logo}> 🎯 </div>
                        <h1 className={styles.first_box_bold_p}> 맞춤형 성장 로드맵 </h1>
                        <p className={styles.first_box_p}>
                            개인의 목표와 현재 수준에 맞는 학습 계획을 <br />
                            세우고, 단계별로 체계적인 성장을 <br />
                            이뤄나가세요.
                        </p>
                    </section>
                </section>
                <section className={styles.down_three_boxes}>
                    <h1 className={styles.d_none}> 카테고리 목록 </h1>
                    <section className={styles.first_box}>
                        <h1 className={styles.first_box_logo}> 🤝 </h1>
                        <p className={styles.first_box_bold_p}> 네트워킹 </p>
                        <p className={styles.first_box_p}>
                            같은 분야의 개발자들과 네트워크를 형성하고, <br />
                            서로의 경험을 공유하며 함께 성장하세요.
                        </p>
                    </section>
                    <section className={styles.first_box}>
                        <div className={styles.first_box_logo}> 📚 </div>
                        <h1 className={styles.first_box_bold_p}> 실무 중심 콘텐츠 </h1>
                        <p className={styles.first_box_p}>
                            이론보다는 실제 프로젝트에서 사용되는 살아 <br />
                            있는 지식과 노하우를 배우세요.
                        </p>
                    </section>
                    <section className={styles.first_box}>
                        <div className={styles.first_box_logo}> 🏆 </div>
                        <h1 className={styles.first_box_bold_p}> 성과 추적 </h1>
                        <p className={styles.first_box_p}>
                            학습 진도와 성장 과정을 시각화하여 동기 부여 <br />
                            를 유지하고 목표를 달성하세요.
                        </p>
                    </section>
                </section>
                <div className={styles.bottom}>
                    <p className={styles.bottom_bold_p}> 지금 바로 시작하세요 </p>
                    <p className={styles.bottom_p}>
                        수천 명의 개발자들이 이미 Job담과 함께 성장하고 있습니다. <br />
                        당신도 지금 바로 합류해보세요!
                    </p>
                    <nav>
                        <Link href="/login" className={styles.bottom_start_now}>
                            🚀무료로 시작하기
                        </Link>
                    </nav>
                </div>
            </div>
        </main>
    )
}

export { StartPage }