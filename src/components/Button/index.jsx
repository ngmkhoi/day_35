import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

// Thêm các prop mới: leftIcon, rightIcon, danger
function Button({
                    children,
                    primary = false,
                    bordered = false,
                    danger = false, // Biến thể cho hành động nguy hiểm (VD: Xóa)
                    rounded = false,
                    size = 'medium',
                    href,
                    disabled = false,
                    loading = false,
                    leftIcon = null,
                    rightIcon = null,
                    className,
                    onClick,
                    ...props
                }) {
    const Component = href ? 'a' : 'button';
    const classes = clsx(styles.button, {
        [styles.primary]: primary,
        [styles.bordered]: bordered,
        [styles.danger]: danger,
        [styles.rounded]: rounded,
        [styles[size]]: true,
        [styles.disabled]: disabled || loading,
        [styles.loading]: loading,
        [styles.withIcon]: leftIcon || rightIcon,
        [className]: className,
    });

    const handleClick = (e) => {
        if (disabled || loading) return;
        if (onClick) onClick(e);
    };

    const content = (
        <>
            {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
        </>
    );

    return (
        <Component
            className={classes}
            href={href}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    {/* Ẩn nội dung thật để giữ nguyên kích thước button */}
                    <span className={styles.hidden}>{content}</span>
                    {/* Spinner CSS thay cho emoji */}
                    <div className={styles.loader}></div>
                </>
            ) : (
                content
            )}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    bordered: PropTypes.bool,
    danger: PropTypes.bool,
    rounded: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    href: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;