import classes from './ThemeSelector.module.css';
import TrippleToggle from './TrippleToggle/TrippleToggle';

const ThemeSelector = ({ theme }) => {
    return (
        <div className={classes.ThemeSelector}>
            <div className={classes.Label}>THEME</div>
            <TrippleToggle theme={theme}></TrippleToggle>
        </div>
    );
};

export default ThemeSelector;
