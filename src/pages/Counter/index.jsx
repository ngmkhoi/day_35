import React from "react";
// Sửa lại cách import để sử dụng SCSS Modules
import styles from './Counter.module.scss';

function CounterApp() {
    const [count, setCount] = React.useState(0);

    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count - 1);
    const reset = () => setCount(0);

    // Xác định trạng thái của counter để áp dụng class CSS tương ứng
    const getStatusClass = () => {
        if (count > 0) return styles.positive;
        if (count < 0) return styles.negative;
        return styles.zero;
    };

    return (
        // Sử dụng object `styles` và thêm class trạng thái động
        <div className={`${styles.counter} ${getStatusClass()}`}>

            <div className={styles.displayArea}>
                <h1>{count}</h1>
            </div>

            <p className={styles.statusText}>
                Trạng thái: {count > 0 ? 'Dương' : count < 0 ? 'Âm' : 'Bằng không'}
            </p>

            <div className={styles.buttonGroup}>
                <button onClick={decrease} className={`${styles.btn} ${styles.decreaseBtn}`}>Giảm</button>
                <button onClick={reset} className={`${styles.btn} ${styles.resetBtn}`}>Reset</button>
                <button onClick={increase} className={`${styles.btn} ${styles.increaseBtn}`}>Tăng</button>
            </div>
        </div>
    );
}

export default CounterApp;