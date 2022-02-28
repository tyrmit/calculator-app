import classes from './KeyButton.module.css';

const KeyButton = ({ theme, size, type, children }) => {
    const classList = [
        classes.KeyButton,
        classes[`${type}`],
        classes[`Theme${theme}`],
        classes[size],
    ];

    return <div className={classList.join(' ')}>{children}</div>;
};

export default KeyButton;
