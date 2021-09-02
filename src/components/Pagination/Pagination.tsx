import { useState } from "react";
import styles from "./Pagination.module.css"

type PropsType = {
    currentPage: number
    onPageChange: (currentPage: number) => void
    totalUsersCount: number
    pageSize: number
    portionNumber: number
    setPortionNumber: (number: number) => void
}

let Pagination: React.FC<PropsType> = ({ currentPage, onPageChange, totalUsersCount, pageSize, setPortionNumber, portionNumber }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let [portionSize] = useState(10);

    let pagination = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagination.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={styles.pagination}>
            {portionNumber > 1 &&
                <button onClick={ () => { setPortionNumber(portionNumber - 1) }}>prev</button>
            }
            {pagination
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={currentPage === p ? styles.current : undefined}
                        onClick={(e) => { onPageChange(p) }} key={p} >{p}</span>
                })}
            { portionCount > portionNumber &&
                <button onClick={ () => { setPortionNumber(portionNumber + 1) }}>next</button>
            }
        </div>
    )
}

export default Pagination;