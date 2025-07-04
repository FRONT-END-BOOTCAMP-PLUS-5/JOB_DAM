import styles from './signupForm.module.scss';

function SignupLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.signupPageContainer}>{children}</main>;
}

export default SignupLayout;
