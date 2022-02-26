import ThemeSelector from './ThemeSelector/ThemeSelector';

import classes from './CalcHeader.module.css';

const CalcHeader = (props) => {
    return (
        <header className={classes.CalcHeader}>
            <div className={classes[`Theme${props.theme}`]}>calc</div>
            <ThemeSelector></ThemeSelector>
        </header>
    );
};

export default CalcHeader;
