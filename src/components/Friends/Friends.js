import styles from "./Friends.module.css"
import Person from "./Person/Person"

function Friends(props) {
    let friendsList = props.friends.map( (arr) => {
        return <Person key={arr.id} photo={arr.photo} name={arr.name}/>
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Friends</div>
            <div className={styles.list}>
                { friendsList }
            </div>
        </div>
    )
}
export default Friends;