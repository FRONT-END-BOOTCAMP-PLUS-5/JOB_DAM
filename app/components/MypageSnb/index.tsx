import Link from 'next/link';
import styles from './mypageSnb.module.scss';

const MYPAGE_SNB = [
  { name: '계정', links: [{ text: '내 정보 보기', href: '/mypage' }] },
  {
    name: '나의 질문',
    links: [
      { text: '작성한 질문', href: '/' },
      { text: '좋아요 누른 질문', href: '/' },
    ],
  },
  {
    name: '멘토 정보',
    links: [
      { text: '멘토 신청하기', href: '/mypage/application' },
      { text: '작성한 리뷰', href: '/' },
      { text: '좋아요 누른 멘토', href: '/' },
    ],
  },
  {
    name: '나눴던 채팅',
    links: [{ text: '채팅방 보기', href: '/chat' }],
  },
];

const MypageSnb = () => {
  return (
    <nav className={styles.mypage_nav}>
      {MYPAGE_SNB.map((item, index) => (
        <div className={styles.link_box} key={item?.name + index}>
          <h4>{item?.name}</h4>
          {item?.links.map((linkItem, lIndex) => (
            <Link href={linkItem?.href} key={linkItem?.text + lIndex}>
              {linkItem?.text}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default MypageSnb;
