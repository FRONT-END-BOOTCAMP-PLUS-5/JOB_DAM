'use client';

import styles from './loginPage.module.scss';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.login_container}>{children}</main>;
}

export default LoginLayout;
