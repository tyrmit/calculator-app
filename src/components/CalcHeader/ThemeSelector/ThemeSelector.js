import classes from './ThemeSelector.module.css';
import TrippleToggle from './TrippleToggle/TrippleToggle';

const ThemeSelector = (props) => {
    return (
        <div className={classes.ThemeSelector}>
            <div className={classes.Label}>THEME</div>
            <TrippleToggle theme={props.theme}></TrippleToggle>
        </div>
    );
};

export default ThemeSelector;
