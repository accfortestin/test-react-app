import { useForm } from 'react-hook-form';
import styles from "./Settings.module.css"
import penIcon from "./../../assets/images/icons/pen.svg"
import Preloader from '../../components/Preloader/Preloader';
import { UserProfileDataType } from '../../redux/profileReducer';

type PropsType = {
    onSubmit: (data: any) => void
    editMode: boolean
    onEditClick: () => void
    profileData: UserProfileDataType | null
}

let Settings: React.FC<PropsType> = ({onSubmit, editMode, onEditClick, profileData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });
    if (profileData == null) {
        return <Preloader />
    }
    return (
        <div className={styles.wrapper}>
            <h2>Settings</h2>
            <div className={styles.editTitle} onClick={() => {onEditClick()}}>Change profile information<span className={styles.penIcon}><img src={penIcon} alt="" /></span></div>
            <form hidden={!editMode} className={styles.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className={styles.inputWrapper}>
                    <label htmlFor='lookingForAJob' className={styles.label} >Are you looking for a job?</label>
                    <input id='lookingForAJob' className={styles.input} type='checkbox' {...register('lookingForAJob')} />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='lookingForAJobDescription' className={styles.label} >Job-hunting  information:</label>
                    <input id='lookingForAJobDescription' className={styles.input} {...register('lookingForAJobDescription', { required: true })} defaultValue={profileData.lookingForAJobDescription || undefined} />
                    {errors.lookingForAJobDescription && <span className={styles.error}>The field is required</span>}
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='fullName' className={styles.label} >Full name:</label>
                    <input id='fullName' className={styles.input} {...register('fullName', { required: true })} defaultValue={profileData.fullName || undefined} />
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor='aboutMe' className={styles.label} >About me:</label>
                    <input id='aboutMe' className={styles.input} {...register('aboutMe', { required: true })} defaultValue={profileData.aboutMe || undefined} />
                </div>
                <div className={styles.inputWrapper}>
                    <div>Contacts:</div>
                    <div className={styles.contacts}>

                        {Object.keys(profileData.contacts).map(key => {
                            return <div key={key}>
                                <label htmlFor={key} className={styles.label} >{key}:</label>
                                <input id={key} className={styles.input} {...register(`contacts.${key}`)} defaultValue={profileData.contacts[key]} />
                            </div>
                        })}
                    </div>
                </div>
                <button className={styles.submitButton} >Submit</button>
                
            </form>
        </div>
    )
}
export default Settings;