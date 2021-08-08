import styles from './Preloader.module.css';

function Preloader() {
    return (
        <div className={styles.preloader}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default Preloader;