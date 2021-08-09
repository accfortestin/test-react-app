import styles from "./Post.module.css"
import like from "./images/like.png"

function Post({message, likeCounter}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" alt="" />
            </div>
            <div className={styles.content}>
                <div className={styles.text}> { message } </div>
                <div className={styles.likeWrapper}>
                    <div className={styles.like}>
                        <img src={like} alt=""/>
                    </div>
                    <div className={styles.likeCounter}>{ likeCounter }</div>
                </div>
            </div>
            
        </div>
    )
}
export default Post;