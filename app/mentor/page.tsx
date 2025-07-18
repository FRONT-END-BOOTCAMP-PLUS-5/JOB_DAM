'use client';

import { Button, Modal, TextField } from '@mui/material';
import styles from './mentor.module.scss';
import { useEffect, useState } from 'react';
import { mentorService } from '../services/mypage/mentor';
import { Mentors } from '../types/mentor/search';
import { chatroomService } from '../services/chatroom/chatroom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Spinner from '../components/common/Spinner';

const MentorPage = () => {
  const member = useSelector((state: RootState) => state.login.member);

  const [mentors, setMentors] = useState<Mentors[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectMentorId, setSelectMentorId] = useState('');
  const [chatRoomTitle, setChatRoomTitle] = useState('');
  const [chatRoomDescription, setChatRoomDescription] = useState('');
  const [chatRoomMaxPeople, setChatRoomMaxPeople] = useState(1);
  const [applyCompleteModal, setApplyCompleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { getMentorList } = mentorService;
  const { addChatRoom } = chatroomService;

  const handleAddChatRoom = async () => {
    const chatRoomData = {
      title: chatRoomTitle,
      description: chatRoomDescription,
      created_member_id: selectMentorId,
      max_people: chatRoomMaxPeople,
      member_id: member?.id,
    };

    await addChatRoom(chatRoomData).then((res) => {
      if (res.result.status === 200) {
        setApplyCompleteModal(true);
        reset();
      }
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
    getMentorList().then((res) => {
      if (res.data) {
        setMentors(res.data.members);
        setLoading(false);
      }
    });
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.content}>
        {loading && <Spinner />}
        {!loading &&
          mentors?.length > 0 &&
          mentors?.map((item, index) => (
            <section className={styles.mentor_card} key={item?.nickname + index}>
              <div className={styles.flex}>
                <section className={styles.profile_image}>
                  <Image src={item?.img ?? ''} alt="프로필 이미지" fill />
                </section>
                <section className={styles.mentor_info}>
                  <h1>
                    {item?.mentorApplication?.company} / {item?.grade === 0 ? '주니어' : '시니어'}
                  </h1>
                  <h2>
                    {item?.nickname} ({item?.name})
                  </h2>
                  <h3>포인트: {item?.point}</h3>
                </section>
              </div>
              {member?.id !== item?.id && member?.type !== 1 && (
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
              )}
            </section>
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

      <Modal open={applyCompleteModal} onClose={() => setApplyCompleteModal(false)}>
        <section className={`${styles.modal_container} ${styles.complete_modal}`}>
          <h2>채팅신청이 완료되었어요! </h2>
          <h3>멘토가 채팅방을 승인하면 채팅할수 있어요.</h3>
          <Button variant="contained" href="/mypage/chat">
            채팅방 보러가기
          </Button>
        </section>
      </Modal>
    </section>
  );
};

export default MentorPage;
