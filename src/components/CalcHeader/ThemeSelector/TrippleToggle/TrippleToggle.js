import classes from './TrippleToggle.module.css';

const TrippleToggle = ({ theme, click }) => {
    return (
        <div className={classes.TrippleToggle} onClick={click}>
            <div className={classes.Label}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
            <div
                className={[
                    classes.Toggle,
                    classes[`ToggleTheme${theme}`],
                ].join(' ')}
            >
                <div
                    className={[
                        classes.ToggleSwitch,
                        classes[`SwitchTheme${theme}`],
                    ].join(' ')}
                ></div>
            </div>
        </div>
    );
};

export default TrippleToggle;
