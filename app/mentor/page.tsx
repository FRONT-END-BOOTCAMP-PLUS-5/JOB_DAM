'use client';

import { Button, Card, CardContent, Modal, TextField } from '@mui/material';
import styles from './mentor.module.scss';
import { useEffect, useState } from 'react';
import { mentorService } from '../services/mypage/mentor';
import { Mentors } from '../types/mentor/search';
import { chatroomService } from '../services/chatroom/chatroom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Member } from '../store/isLogin/loginSlice';

const MentorPage = () => {
  const member = useSelector((state: RootState) => state.login.member);
  const [mentors, setMentors] = useState<Mentors[]>([]);
  const [user, setUser] = useState<Member>(member);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectMentorId, setSelectMentorId] = useState('');
  const [chatRoomTitle, setChatRoomTitle] = useState('');
  const [chatRoomDescription, setChatRoomDescription] = useState('');
  const [chatRoomMaxPeople, setChatRoomMaxPeople] = useState(1);

  const { getMentorList } = mentorService();
  const { addChatRoom } = chatroomService;

  const handleAddChatRoom = () => {
    const chatRoomData = {
      title: chatRoomTitle,
      description: chatRoomDescription,
      created_member_id: selectMentorId,
      max_people: chatRoomMaxPeople,
      member_id: user?.id,
    };

    addChatRoom(chatRoomData).then((res) => {
      console.log('res', res);
      reset();
    });
  };

  const reset = () => {
    setModalOpen(false);
    setSelectMentorId('');
    setChatRoomTitle('');
    setChatRoomDescription('');
    setChatRoomMaxPeople(1);
  };

  useEffect(() => {
    setUser(member);
  }, [member]);

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
                <button
                  className={styles.apply_button}
                  onClick={() => {
                    {
                      setModalOpen(true);
                      setSelectMentorId(item?.id);
                    }
                  }}
                >
                  채팅 신청하기
                </button>
              </CardContent>
            </Card>
          ))}
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <section className={styles.modal_container}>
          <h1>채팅방 신청하기</h1>
          <section className={styles.text_field}>
            <TextField
              label="채팅방 이름"
              variant="outlined"
              placeholder="채팅방 이름"
              onChange={(e) => setChatRoomTitle(e.target.value)}
            />
            <TextField
              label="채팅방 설명"
              variant="outlined"
              placeholder="채팅방 설명"
              onChange={(e) => setChatRoomDescription(e.target.value)}
            />
            <TextField
              label="최대 인원수"
              variant="outlined"
              placeholder="최대 인원수"
              type="number"
              onChange={(e) => setChatRoomMaxPeople(Number(e.target.value))}
            />
          </section>
          <section className={styles.button_section}>
            <Button fullWidth variant="contained" onClick={() => handleAddChatRoom()}>
              신청
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              취소
            </Button>
          </section>
        </section>
      </Modal>
    </section>
  );
};

export default MentorPage;
