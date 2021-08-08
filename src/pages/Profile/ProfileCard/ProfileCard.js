import styles from "./ProfileCard.module.css"
import defaultPhoto from './../../../assets/images/default_avatar.jpg'
import ProfileStatusContainer from "../ProfileStatus/ProfileStatusContainer";

function ProfileCard(props) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.image}><img src={!props.profileData.photos.large ? defaultPhoto : props.profileData.photos.large} alt="" /></div>
          <div className={styles.info}>
            <div className={styles.name}>{props.profileData.fullName}</div>
            <div className={styles.status}><ProfileStatusContainer /></div>
            {!props.profileData.lookingForAJob ? "" : <div className={styles.data}>Job-hunting: {props.profileData.lookingForAJobDescription}</div> }
          </div>
        </div>
    )
}
export default ProfileCard;