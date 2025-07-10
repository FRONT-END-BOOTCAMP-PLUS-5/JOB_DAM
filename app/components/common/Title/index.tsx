'use client';

import styles from './title.module.scss';

interface IProps {
  text: string;
}

// 추후 공통 제목 스타일이 늘어나면 리팩토링 예정
// ex) type: 'mypage' | 'main' 에 따라 스타일이 변함

const Title = ({ text }: IProps) => {
  return <h2 className={styles.title_style}>{text}</h2>;
};
export default Title;
