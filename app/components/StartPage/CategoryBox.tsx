'use client';

import styles from './CategoryBox.module.scss';

interface CategoryBoxProps {
    logo: string;
    title: string;
    description: React.ReactNode;
}

export default function CategoryBox({ logo, title, description }: CategoryBoxProps) {
    return (
        <section className={styles.category_box}>
            <div className={styles.category_logo}>{logo}</div>
            <h1 className={styles.category_title}>{title}</h1>
            <div className={styles.category_description}>{description}</div>
        </section>
    );
}