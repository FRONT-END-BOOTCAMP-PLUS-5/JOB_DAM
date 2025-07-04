import styles from './loginPage.module.scss';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.loginContainer}>{children}</main>;
}

export default LoginLayout;
