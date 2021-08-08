import styles from "./Message.module.css"

function Message(props) {
    return (
        <div className={styles.message}>
            <div className={styles.person}>
                <div className={styles.image}>
                    <img src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
                </div>
                <div className={styles.name}>
                    {props.name}
                </div>
            </div>
            <div className={styles.cloud}>{props.message}</div>
        </div>
    )
}

export default Message;