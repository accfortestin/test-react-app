import styles from "./ProfileStatus.module.css"

function ProfileStatus(props) {

    return (
        <div className={styles.wrapper}>
            { !props.editMode &&
                <span onDoubleClick={() => props.enableEditMode()}>
                    {props.userStatus || 'Enter your status...'}
                </span>
            }
            { props.editMode &&
                <>
                    <input autoFocus onBlur={() => props.disableEditMode()} onChange={(e) => props.changeStatus(e)} value={props.newStatus} placeholder='Enter your status...' />
                </>
            }
        </div>
    )
}
export default ProfileStatus;