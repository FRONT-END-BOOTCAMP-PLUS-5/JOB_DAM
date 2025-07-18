'use client';

import { useEffect, useState } from 'react';
import styles from './application.module.scss';
import { mentorService } from '@/app/services/mypage/mentor';
import Title from '@/app/components/common/Title';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '@/app/components/common/Spinner';
import { ApplicationMentorList } from '@/app/types/mypage/mentor';

const Application = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [company, setCompany] = useState('');
  const [level, setLevel] = useState('');
  const [workPeriod, setWorkPeriod] = useState({ startDate: '', endDate: '' });
  const [isApplication, setIsApplication] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mentorInfo, setMentorInfo] = useState<ApplicationMentorList[]>([]);

  const { applicationMentor, getMentorApplication } = mentorService;

  const onClickApplicationMentor = async () => {
    const { data } = await applicationMentor({
      id: member?.id,
      company: company,
      level: level,
      workPeriod: workPeriod.startDate + workPeriod.endDate,
    });

    if (data) {
      toast.success('멘토 신청이 완료 되었습니다.');
      getMentorInfo(member?.id);
    } else {
      toast.error('멘토 신청이 완료 되었습니다.');
    }
  };

  const getMentorInfo = async (userId: string) => {
    await getMentorApplication(userId).then((res) => {
      setIsApplication(res.mentor?.length > 0);
      setMentorInfo(res.mentor);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (member?.id) {
      getMentorInfo(member?.id);
    }
  }, [member]);

  return (
    <section className={styles.user_container}>
      <Title text={member?.type === 0 ? '멘토 신청하기' : '멘토 정보'} />
      {loading && <Spinner />}
      {!loading && !isApplication && (
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
          <button className={styles.apple_button} onClick={() => onClickApplicationMentor()} disabled={isApplication}>
            멘토 신청하기
          </button>
        </>
      )}

      {!loading && isApplication && member?.type !== 1 && (
        <div className={styles.application_waiting}>
          <h2>멘토 신청을 열심히 검토 하고 있어요.</h2>
          <h4>시간이 좀 걸릴수도 있어요!</h4>
        </div>
      )}

      {!loading && member?.type === 1 && (
        <section className={styles.mentor_info_section}>
          <div>
            <p>회사</p>
            <span>{mentorInfo[0]?.company}</span>
          </div>
          <div>
            <p>직급</p>
            <span>{mentorInfo[0]?.level}</span>
          </div>
          <div>
            <p>근무기간</p>
            <span>{mentorInfo[0]?.workPeriod}</span>
          </div>
        </section>
      )}
    </section>
  );
};

export default Application;
