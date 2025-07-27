import styles from './isLogin.module.scss';

export default function IsLogin() {
  return (
    <div className={styles.isLoginContainer}>
      <h1 className={styles.isLoginTitle}>이미 로그인이 되어있습니다. 메인 페이지로 이동합니다...</h1>
    </div>
  );
}
