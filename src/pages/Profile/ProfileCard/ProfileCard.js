import styles from "./ProfileCard.module.css"
import defaultPhoto from './../../../assets/images/default_avatar.jpg'
import ProfileStatusContainer from "../ProfileStatus/ProfileStatusContainer";

function ProfileCard({fullName, lookingForAJob, lookingForAJobDescription, photos}) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.image}><img src={!photos.large ? defaultPhoto : photos.large} alt="" /></div>
          <div className={styles.info}>
            <div className={styles.name}>{fullName}</div>
            <div className={styles.status}><ProfileStatusContainer /></div>
            {!lookingForAJob ? "" : <div className={styles.data}>Job-hunting: {lookingForAJobDescription}</div> }
          </div>
        </div>
    )
}
export default ProfileCard;