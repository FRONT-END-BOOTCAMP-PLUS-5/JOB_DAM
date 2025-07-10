'use client';

import { useEffect, useState } from 'react';
import styles from './application.module.scss';
import { mentorService } from '@/app/services/mypage/mentor';
import Title from '@/app/components/common/Title';

const Application = () => {
  const [company, setCompany] = useState('');
  const [level, setLevel] = useState('');
  const [workPeriod, setWorkPeriod] = useState({ startDate: '', endDate: '' });
  const [isApplication, setIsApplication] = useState(false);

  const { applicationMentor, getMentorApplication } = mentorService();

  const onClickApplicationMentor = async () => {
    const { data, error } = await applicationMentor({
      company: company,
      level: level,
      workPeriod: workPeriod.startDate + workPeriod.endDate,
    });

    if (data) {
      alert('멘토 신청이 완료 되었습니다.');
      getMentorInfo();
    } else {
      alert('멘토 신청에 실패 하였습니다.');
      console.log('error ', error.message);
    }
  };

  const getMentorInfo = async () => {
    // 임시로 멤버 아이디 넣어놓음
    const memberId = '0bd61fbf-71fd-44e1-a590-1e53af363c3c';

    const data = await getMentorApplication(memberId);

    setIsApplication(!data?.data);
  };

  useEffect(() => {
    getMentorInfo();
  }, [isApplication]);

  return (
    <section className={styles.user_container}>
      <Title text="멘토 신청하기" />
      {isApplication && (
        <>
          <div className={styles.input_box}>
            <h4>회사이름</h4>
            <input type="text" placeholder="회사이름" onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className={styles.input_box}>
            <h4>직급</h4>
            <input type="text" placeholder="직급" onChange={(e) => setLevel(e.target.value)} />
          </div>
          <div className={styles.input_box}>
            <h4>근무기간</h4>
            <div>
              <input type="date" onChange={(e) => setWorkPeriod((prev) => ({ ...prev, startDate: e.target.value }))} />
              ~
              <input type="date" onChange={(e) => setWorkPeriod((prev) => ({ ...prev, endDate: e.target.value }))} />
            </div>
          </div>
          <button className={styles.apple_button} onClick={() => onClickApplicationMentor()} disabled={!isApplication}>
            멘토 신청하기
          </button>
        </>
      )}

      {!isApplication && (
        <div className={styles.application_waiting}>
          <h2>멘토 신청을 열심히 검토 하고 있어요.</h2>
          <h4>시간이 좀 걸릴수도 있어요!</h4>
        </div>
      )}
    </section>
  );
};

export default Application;
