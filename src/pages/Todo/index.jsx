import React from "react";
import styles from './Todo.module.scss';

let uniqId = 4; // Bắt đầu từ một số để không trùng với key của dữ liệu mẫu

// Dữ liệu mẫu để giao diện trông đẹp hơn khi bắt đầu
const initialTodos = [
    { id: 1, text: 'Thiết kế lại giao diện người dùng', completed: false },
    { id: 2, text: 'Sửa lỗi CSS Modules', completed: true },
    { id: 3, text: 'Thêm hiệu ứng animation', completed: false },
];

function TodoApp() {
    const [inputValue, setInputValue] = React.useState('');
    const [todos, setTodos] = React.useState(initialTodos);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([{ id: ++uniqId, text: inputValue, completed: false }, ...todos]);
            setInputValue('');
        }
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleToggle = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;

    return (
        // Sử dụng object `styles` cho tất cả các class
        <div className={styles.todoContainer}>
            <div className={styles.header}>
                <h1>Công việc hôm nay</h1>
                <p>Hoàn thành: {completed}/{total}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Thêm một công việc mới..."
                />
                <button type="submit" aria-label="Thêm công việc">+</button>
            </form>

            <ul className={styles.todoList}>
                {todos.length === 0 ? (
                    <p className={styles.empty}>Tuyệt vời! Không có công việc nào.</p>
                ) : (
                    todos.map(todo => (
                        <li key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
                            <button onClick={() => handleToggle(todo.id)} className={styles.checkbox} aria-label="Đánh dấu hoàn thành">
                                {todo.completed && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </button>
                            <span className={styles.text}>{todo.text}</span>
                            <button onClick={() => handleDelete(todo.id)} className={styles.deleteButton} aria-label="Xóa công việc">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoApp;