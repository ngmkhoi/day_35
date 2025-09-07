import styles from './Products.module.scss';
import React from "react";

function ProductList() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedPost, setselectedPost] = React.useState(null);

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
            .then(response => response.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            }).catch(error => {
            console.error('Error fetching posts:', error);
            setLoading(false);
        });
    }, []);

    const handleOpenModal = (post) => {
        setselectedPost(post);
    };

    const handleCloseModal = () => {
        setselectedPost(null);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return(
        // Thay đổi tất cả các className từ dạng chuỗi "..." sang dạng object {styles....}
        <div className={styles.productsContainer}>
            <h1>Product List</h1>
            {loading ? (
                <p className={styles.loading}>Đang tải...</p>) : posts.length > 0 ? (
                <div className={styles.grid}>
                    {posts.map(post => (
                        <div key={post.id} className={styles.postCard}>
                            <h3>{capitalizeFirstLetter(truncateText(post.title, 30))}</h3>
                            <p>{truncateText(post.body, 100)}</p>
                            <button onClick={() => handleOpenModal(post)}>Xem chi tiết</button>
                        </div>
                    ))}
                </div>
            )   : (
                <p className={styles.loading}>Không có bài viết</p>
            )}
            {selectedPost && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{capitalizeFirstLetter(selectedPost.title)}</h2>
                        <p>{selectedPost.body}</p>
                        <button onClick={handleCloseModal}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;