import styles from './signupPage.module.scss';

function SignupLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.sign_up_layout_container}>{children}</main>;
}

export default SignupLayout;
