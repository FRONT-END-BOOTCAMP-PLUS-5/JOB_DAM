'use client';

import styles from './CategoryBox.module.scss';
import { Category } from '@/app/types/main';

export default function CategoryBox({ logo, title, description }: Category) {
  return (
    <section className={styles.category_box}>
      <div className={styles.category_logo}>{logo}</div>
      <h1 className={styles.category_title}>{title}</h1>
      <div className={styles.category_description}>{description}</div>
    </section>
  );
}
