import ThemeSelector from './ThemeSelector/ThemeSelector';

import classes from './CalcHeader.module.css';

const CalcHeader = (props) => {
    return (
        <header
            className={[
                classes.CalcHeader,
                classes[`Theme${props.theme}`],
            ].join(' ')}
        >
            <div>calc</div>
            <ThemeSelector theme={props.theme}></ThemeSelector>
        </header>
    );
};

export default CalcHeader;
