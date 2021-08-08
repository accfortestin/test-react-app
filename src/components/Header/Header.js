import { NavLink } from "react-router-dom";
import styles from "./Header.module.css"

function Header(props) {
    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}><img src="http://pngimg.com/uploads/snapchat/snapchat_PNG30.png" alt=""/></div>
            {props.isAuth ? 
            <>
                <div className={styles.login}>{"Hi, " + props.login}</div>
                <button className={styles.logout} onClick={() => {props.onLogOut()}}>Log Out</button> 
            </>
            : <NavLink className={styles.login} to="/login" >Login</NavLink>}
        </header>
    )
}
export default Header;