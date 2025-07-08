import styles from "../components/Chatroom.module.scss";

const Chatroom = () => {
    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <button className={styles.headerButton1}> + </button>
                <button className={styles.headerButton2}> 마이페이지 </button>
            </div>
            <div className={styles.main}></div>
        </div>
    )
}

export { Chatroom };