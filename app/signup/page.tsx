import styles from './signupForm.module.scss';
import SignupForm from '@/app/components/SignUpForm';

export default function SignupPage() {
  return (
    <div className={styles.signupPageContainer}>
      <div className={styles.signupTitleContainer}>
        <h1 className={styles.signupTitleText}>회원가입</h1>
        <p>당신의 커리어 여정을 함께 나아가세요</p>
      </div>
      <SignupForm />
    </div>
  );
}
