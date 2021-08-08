import styles from "./Users.module.css"
import userPhoto from './../../assets/images/default_avatar.jpg'
import { NavLink } from "react-router-dom";

let Users = (props) => {

    return (
        <div className={styles.wrapper}>
            {props.usersList.map((u) => {
                return (
                    <div className={styles.userWrapper} key={u.id}>
                        <div className={styles.leftColumn}>
                            <NavLink to={'/profile/' + u.id} className={styles.photo}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
                            </NavLink>
                            <button className={styles.followButton} disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {props.onFollowButtonClick(u.id, u.followed)}} >
                                {u.followed ? "un" : ""}follow
                            </button>
                        </div>
                        <div className={styles.rightColumn}>
                            <div className={styles.contentWrapper}>
                                <div className={styles.name}>
                                    {u.name}
                                </div>
                                <div className={styles.quote}>
                                    {u.status}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className={styles.pagination}>
                {props.pagination.map(p => {
                    return <span className={props.currentPage === p ? styles.current : undefined}
                        onClick={(e) => { props.onPageChange(p) }} key={p} >{p}</span>
                })}
            </div>
        </div>
    )
}

export default Users;