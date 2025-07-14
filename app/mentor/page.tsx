'use client';

import { Card, CardContent } from '@mui/material';
import styles from './mentor.module.scss';
import { useEffect, useState } from 'react';
import { mentorService } from '../services/mypage/mentor';
import { Mentors } from '../types/mentor/search';
import { chatroomService } from '../services/chatroom/chatroom';

const MentorPage = () => {
  const [mentors, setMentors] = useState<Mentors[]>([]);

  const { getMentorList } = mentorService();
  const { addChatRoom } = chatroomService;

  const handleAddChatRoom = (createdId: string) => {
    const chatRoomData = {
      title: '멘티가 신청한 채팅방3463463634',
      description: '멘티가 신청한 채팅방 내용123123213636436',
      created_member_id: createdId,
      max_people: 3,
      member_id: 'c4b1ac92-d06d-4fa7-b2c1-1738b2b4cab4',
    };

    addChatRoom(chatRoomData).then((res) => {
      console.log('res', res);
    });
  };

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
                    {item?.nickname} ({item?.name})
                  </h2>
                  <h3>포인트: {item?.point}</h3>
                </section>
                <button className={styles.apply_button} onClick={() => handleAddChatRoom(item?.id)}>
                  채팅하기
                </button>
              </CardContent>
            </Card>
          ))}
      </section>
    </section>
  );
};

export default MentorPage;
