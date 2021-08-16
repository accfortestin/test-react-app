import styles from "./ProfileCard.module.css"
import defaultPhoto from './../../../assets/images/default_avatar.jpg'
import facebook from './../../../assets/images/socials/facebook.png'
import github from './../../../assets/images/socials/github.png'
import instagram from './../../../assets/images/socials/instagram.png'
import mainLink from './../../../assets/images/socials/mainLink.png'
import twitter from './../../../assets/images/socials/twitter.png'
import vk from './../../../assets/images/socials/vk.png'
import website from './../../../assets/images/socials/website.png'
import youtube from './../../../assets/images/socials/youtube.png'
import ProfileStatusContainer from "../ProfileStatus/ProfileStatusContainer";

function ProfileCard({ fullName, lookingForAJob, lookingForAJobDescription, photos, contacts, currentProfileUserID, authUserID, onUploadingMainPhoto }) {
  let socials = {facebook, github, instagram, mainLink, twitter, vk, website, youtube}
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <div className={styles.image}><img src={photos.large || defaultPhoto} alt="" /></div>
        {+currentProfileUserID === authUserID ?
          <><label htmlFor='photoInput' className={styles.photoInputLabel} >Upload a photo</label><input id='photoInput' type="file" className={styles.photoInput} onChange={ (e) => {onUploadingMainPhoto(e)}} /></>
          : ''}
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{fullName}</div>
        <div className={styles.status}><ProfileStatusContainer /></div>
        {!lookingForAJob ? "" : <div className={styles.data}>Job-hunting: {lookingForAJobDescription}</div>}
        <div className={styles.contacts}>
          {Object.keys(contacts).map(key => {
            return contacts[key].length > 1 ? <a key={key} className={styles.contactItem} href={contacts[key]} target='_blank' rel="noreferrer"><img src={socials[key]} alt='' /></a> : ""
          })}
        </div>
      </div>
    </div>
  )
}
export default ProfileCard;