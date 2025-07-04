import styles from './loginPage.module.scss';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.loginContainer}>{children}</div>;
}

export default LoginLayout;
