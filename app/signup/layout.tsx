import styles from './signupPage.module.scss';

function SignupLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.signUpLayoutContainer}>{children}</main>;
}

export default SignupLayout;
