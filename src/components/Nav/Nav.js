import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css"

function Nav(props) {
    return (
        <nav className={styles.wrapper}>
          <NavLink className={styles.item} to={props.userID ? `/profile/${props.userID}` : `/login`} activeClassName={styles.active}>Profile</NavLink>
          <NavLink className={styles.item} to="/messages" activeClassName={styles.active}>Messages</NavLink>
          <NavLink className={styles.item} to="/news" activeClassName={styles.active}>News</NavLink>
          <NavLink className={styles.item} to="/users" activeClassName={styles.active}>Users</NavLink>
          <NavLink className={styles.item} to="/settings" activeClassName={styles.active}>Settings</NavLink>
        </nav>
    )
}
export default Nav;