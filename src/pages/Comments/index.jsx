import React from "react";
// Sửa lại cách import
import styles from './Comments.module.scss';

// uniqId không phải là cách tốt để tạo key, chỉ dùng tạm thời để demo
// React sẽ cảnh báo nếu bạn thêm comment mới.
// Trong ứng dụng thật nên dùng thư viện như uuid.
let uniqId = 1000;

function CommentSystem() {
    const [comments, setComments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        body: ''
    });

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => response.json())
            .then(data => {
                const commentsWithTime = data.map(comment => ({
                    ...comment,
                    time: `${Math.floor(Math.random() * 10) + 2} giờ trước`
                }));
                setComments(commentsWithTime);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, body } = formData;
        if (name.trim() && email.trim() && body.trim()) {
            const newComment = {
                id: ++uniqId,
                name,
                email,
                body,
                postId: 1,
                time: `Vừa xong`
            };
            setComments([newComment, ...comments]);
            setFormData({ name: '', email: '', body: '' });
        }
    };

    // Nút "Thêm" sẽ bị vô hiệu hóa nếu form chưa điền đủ
    const isFormInvalid = !formData.name.trim() || !formData.email.trim() || !formData.body.trim();

    return (
        // Thay đổi tất cả các className để sử dụng object `styles`
        <div className={styles.commentsContainer}>
            <h1>Bình luận ({(comments.length)})</h1>

            <form onSubmit={handleSubmit} className={styles.commentForm}>
                <h2>Thêm bình luận</h2>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tên của bạn..."
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email..."
                />
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    placeholder="Nội dung bình luận..."
                />
                <button type="submit" disabled={isFormInvalid}>Gửi bình luận</button>
            </form>

            <div className={styles.commentList}>
                {loading ? (
                    <p className={styles.loading}>Đang tải...</p>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className={styles.comment}>
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=random&color=fff`} alt="Avatar" />
                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <h3>{comment.name}</h3>
                                    <span className={styles.time}>{comment.time}</span>
                                </div>
                                <p className={styles.email}>{comment.email}</p>
                                <p className={styles.body}>{comment.body}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.loading}>Chưa có bình luận nào.</p>
                )}
            </div>
        </div>
    );
}

export default CommentSystem;