import styles from "./ProfileStatus.module.css"

function ProfileStatus({enableEditMode, disableEditMode, changeStatus, editMode, userStatus, newStatus}) {

    return (
        <div className={styles.wrapper}>
            { !editMode &&
                <span onDoubleClick={() => enableEditMode()}>
                    {userStatus || 'Enter your status...'}
                </span>
            }
            { editMode &&
                <>
                    <input autoFocus onBlur={() => disableEditMode()} onChange={(e) => changeStatus(e)} value={newStatus} placeholder='Enter your status...' />
                </>
            }
        </div>
    )
}
export default ProfileStatus;