import styles from "./Dialog.module.css"
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

function Dialog(props: PropsType) {
    return (
        <NavLink to={`/messages/${props.id}`} className={styles.dialog} activeClassName={styles.active}>{props.name}</NavLink>
    )
}

export default Dialog;