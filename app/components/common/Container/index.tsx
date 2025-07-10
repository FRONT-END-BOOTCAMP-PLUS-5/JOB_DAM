'use client';

import styles from './container.module.scss';

interface IProps {
  children: React.ReactNode;
}

const Container = ({ children }: IProps) => {
  return <main className={styles.container}>{children}</main>;
};

export default Container;
