import styles from "../components/Chatroom.module.scss";

const Chatroom = () => {

    return (
        <div className={styles.all}>
            <div className={styles.header}>
                <p className={styles.headerLogo}> Job담 </p>
                <button className={styles.headerButton1}> + </button>
                <button className={styles.headerButton2}> 마이페이지 </button>
            </div>
            <div className={styles.recentChat}>
                <h3 className={styles.recentChatH}> 최근 채팅 </h3>
            </div>
            <div className={styles.main}></div>
            <div className={styles.bottom}>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> 24 </h1>
                    <p> 총 채팅방 </p>
                </div>
                <div className={styles.bottomBox}>
                    <h1 className={styles.bottomNum}> 12 </h1>
                    <p> 활성 멘토 </p>
                </div>
            </div>
        </div>
    )
}

export { Chatroom };