import classes from './ThemeSelector.module.css';
import TrippleToggle from './TrippleToggle/TrippleToggle';

const ThemeSelector = ({ theme, click }) => {
    return (
        <div className={classes.ThemeSelector}>
            <div className={classes.Label}>THEME</div>
            <TrippleToggle theme={theme} click={click}></TrippleToggle>
        </div>
    );
};

export default ThemeSelector;
