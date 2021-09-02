import styles from "./Users.module.css"
import userPhoto from './../../assets/images/default_avatar.jpg'
import { NavLink } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { UsersType } from "../../redux/usersReducer";

type PropsType = {
    usersList: Array<UsersType>
    followingInProgress: Array<number>
    onFollowButtonClick: (id: number, isFollowed: boolean) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (currentPage: number) => void
    portionNumber: number
    setPortionNumber: (number: number) => void
}

let Users: React.FC<PropsType> = ({ usersList, followingInProgress, onFollowButtonClick, totalUsersCount, pageSize, currentPage, onPageChange, portionNumber, setPortionNumber }) => {

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
                pageSize={pageSize}
                portionNumber={portionNumber}
                setPortionNumber={setPortionNumber} />
        </div>
    )
}

export default Users;