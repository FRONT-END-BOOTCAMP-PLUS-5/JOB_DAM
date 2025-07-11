'use client';

import { Card, CardContent } from '@mui/material';
import styles from './mentor.module.scss';
import { useEffect, useState } from 'react';
import { mentorService } from '../services/mypage/mentor';
import { Mentors } from '../types/mentor/search';

const MentorPage = () => {
  const [mentors, setMentors] = useState<Mentors[]>([]);

  const { getMentorList } = mentorService();

  useEffect(() => {
    getMentorList().then((res) => {
      if (res.data) {
        setMentors(res.data.members);
      }
    });
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.contnet}>
        {mentors?.length > 0 &&
          mentors?.map((item, index) => (
            <Card variant="outlined" sx={{ minWidth: 300 }} key={item?.name + index}>
              <CardContent>
                <div>이미지</div>
                <section>
                  <h1>회사 / {item?.grade === 0 ? '주니어' : '시니어'}</h1>
                  <h2>
                    {item?.nickname} ({item?.name}){' '}
                  </h2>
                  <h3>포인트: {item?.point}</h3>
                </section>
                <button className={styles.apply_button}>채팅하기</button>
              </CardContent>
            </Card>
          ))}
      </section>
    </section>
  );
};

export default MentorPage;
