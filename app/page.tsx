'use client';

import useAuthInit from './hooks/useAuthInit';

export default function Home() {
  useAuthInit();

  const testMentorSet = () => {
    sessionStorage.setItem('mentor', JSON.stringify({ id: '0bd61fbf-71fd-44e1-a590-1e53af363c3c', name: '장도영' }));
  };

  const testMentiSet = () => {
    sessionStorage.setItem('menti', JSON.stringify({ id: 'c4b1ac92-d06d-4fa7-b2c1-1738b2b4cab4', name: 'youngyoung' }));
  };

  return (
    <div>
      메인 <br />
      <button onClick={testMentorSet}>멘토 아이디 로컬스토리지 저장</button> <br />
      <button onClick={testMentiSet}>멘티 아이디 로컬스토리지 저장</button>
    </div>
  );
}
