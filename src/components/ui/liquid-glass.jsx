import styles from './liquid-glass.module.css';

export function Component({ children, className = '', ...props }) {
    return (
        <div
            {...props}
            className={[styles.glass, className].filter(Boolean).join(' ')}
        >
            {children}
        </div>
    );
}
