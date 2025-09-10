import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.scss';

function Button({
                    children,
                    primary = false,
                    bordered = false,
                    danger = false,
                    rounded = false,
                    size = 'medium',
                    href,
                    to,
                    disabled = false,
                    loading = false,
                    leftIcon = null,
                    rightIcon = null,
                    className,
                    onClick,
                    ...props
                }) {
    // Xác định Component dựa trên prop to hoặc href
    const Component = to ? Link : href ? 'a' : 'button';

    const classes = clsx(
        styles.button,
        {
            [styles.primary]: primary,
            [styles.bordered]: bordered,
            [styles.danger]: danger,
            [styles.rounded]: rounded,
            [styles.disabled]: disabled || loading,
            [styles.loading]: loading,
            [styles.withIcon]: leftIcon || rightIcon,
        },
        styles[size], // Truyền styles[size] riêng
        className // Truyền className riêng
    );

    const handleClick = (e) => {
        if (disabled || loading) {
            // Ngăn điều hướng cho thẻ <a> hoặc Link
            if (Component === 'a' || Component === Link) {
                e.preventDefault();
            }
            return;
        }
        if (onClick) onClick(e);
    };

    const content = (
        <>
            {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
        </>
    );

    // Chỉ truyền các prop phù hợp với loại Component
    const componentProps = {
        className: classes,
        onClick: handleClick,
        ...props,
    };

    if (Component === 'button') {
        componentProps.disabled = disabled || loading;
    } else if (Component === 'a') {
        componentProps.href = href;
    } else if (Component === Link) {
        componentProps.to = to;
    }

    return (
        <Component {...componentProps}>
            {loading ? (
                <>
                    <span className={styles.hidden}>{content}</span>
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
    to: PropTypes.string, // Thêm propTypes cho to
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;