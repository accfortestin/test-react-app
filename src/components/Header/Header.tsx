import { FC } from "react"
import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"

type PropsType = {
    isAuth: boolean
    login: string
    onLogOut: () => void
}

let Header: FC<PropsType> = ({isAuth, login, onLogOut}) => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}><img src="http://pngimg.com/uploads/snapchat/snapchat_PNG30.png" alt=""/></div>
            {isAuth ? 
            <>
                <div className={styles.login}>{"Hi, " + login}</div>
                <button className={styles.logout} onClick={() => {onLogOut()}}>Log Out</button> 
            </>
            : <NavLink className={styles.login} to="/login" >Login</NavLink>}
        </header>
    )
}
export default Header;