import styles from "./Pagination.module.css"

let Pagination = ({ currentPage, onPageChange, totalUsersCount, pageSize }) => {

    let pagination = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    if (currentPage > 5) {
        pagination.push(1);
    }
    for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        if (i > 0 && i < pagesCount) {
            pagination.push(i);
        }
    }
    pagination.push(pagesCount);

    return (
        <div className={styles.pagination}>
            {pagination.map(p => {
                return <span className={currentPage === p ? styles.current : undefined}
                    onClick={(e) => { onPageChange(p) }} key={p} >{p}</span>
            })}
        </div>
    )
}

export default Pagination;