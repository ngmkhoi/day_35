import styles from './Home.module.scss';
import Button from '../../components/Button'; // Import component Button đã tạo
import { ListTodo, MessageSquare, CloudSun, Box, Newspaper, Gem } from 'lucide-react'; // Icon cho các nút

function Home() {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    React Component Showcase
                </h1>
                <p className={styles.subtitle}>
                    Đây là trang tổng hợp các mini-project được xây dựng trong khóa học ReactJS tại F8,
                    mỗi trang là một component độc lập với thiết kế và chức năng riêng.
                </p>
            </div>
        </div>
    );
}

export default Home;