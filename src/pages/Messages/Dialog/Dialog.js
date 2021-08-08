import styles from "./Dialog.module.css"
import { NavLink } from "react-router-dom";

function Dialog(props) {
    return (
        <NavLink to={`/messages/${props.id}`} className={styles.dialog} activeClassName={styles.active}>{props.name}</NavLink>
    )
}

export default Dialog;