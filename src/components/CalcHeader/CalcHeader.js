import ThemeSelector from './ThemeSelector/ThemeSelector';

import classes from './CalcHeader.module.css';

const CalcHeader = ({ theme }) => {
    return (
        <header
            className={[classes.CalcHeader, classes[`Theme${theme}`]].join(' ')}
        >
            <div>calc</div>
            <ThemeSelector theme={theme}></ThemeSelector>
        </header>
    );
};

export default CalcHeader;
