import styles from "./Users.module.css"
import userPhoto from './../../assets/images/default_avatar.jpg'
import { NavLink } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

let Users = ({ usersList, followingInProgress, onFollowButtonClick, totalUsersCount, pageSize, currentPage, onPageChange }) => {

    return (
        <div className={styles.wrapper}>
            {usersList.map((u) => {
                return (
                    <div className={styles.userWrapper} key={u.id}>
                        <div className={styles.leftColumn}>
                            <NavLink to={'/profile/' + u.id} className={styles.photo}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" />
                            </NavLink>
                            <button className={styles.followButton} disabled={followingInProgress.some(id => id === u.id)} onClick={() => { onFollowButtonClick(u.id, u.followed) }} >
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
            <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize} />
        </div>
    )
}

export default Users;