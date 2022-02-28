import { useDispatch } from 'react-redux';
import { pressKey } from '../../../store/actions/calcActions';
import classes from './KeyButton.module.css';

const KeyButton = ({ theme, size, type, children }) => {
    const dispatch = useDispatch();

    const classList = [
        classes.KeyButton,
        classes[`${type}`],
        classes[`Theme${theme}`],
        classes[size],
    ];

    return (
        <div
            className={classList.join(' ')}
            onClick={() => dispatch(pressKey(children))}
        >
            {children}
        </div>
    );
};

export default KeyButton;
