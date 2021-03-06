import ThemeSelector from './ThemeSelector/ThemeSelector';

import classes from './CalcHeader.module.css';

const CalcHeader = (props) => {
    return (
        <header className={classes.CalcHeader}>
            <div>calc</div>
            <ThemeSelector
                theme={props.theme}
                click={props.themeUpdate}
            ></ThemeSelector>
        </header>
    );
};

export default CalcHeader;
