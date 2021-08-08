import styles from "./Person.module.css"

function Person(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.photo}>
                <img src={ props.photo } alt="" />
            </div>
            <div className={styles.name}>{ props.name }</div>
        </div>
    )
}
export default Person;