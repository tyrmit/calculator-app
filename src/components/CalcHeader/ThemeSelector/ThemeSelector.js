import classes from './ThemeSelector.module.css';
import TrippleToggle from './TrippleToggle/TrippleToggle';

const ThemeSelector = (props) => {
    return (
        <div className="theme-selector">
            <div className={classes.Label}>THEME</div>
            <TrippleToggle></TrippleToggle>
        </div>
    );
};

export default ThemeSelector;
