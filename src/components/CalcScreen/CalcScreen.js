import { useSelector } from 'react-redux';
import classes from './CalcScreen.module.css';

const CalcScreen = ({ theme }) => {
    const currentText = useSelector((state) => state.currentScreenText);
    return (
        <section
            className={[classes.Screen, classes[`Theme${theme}`]].join(' ')}
        >
            {currentText}
        </section>
    );
};

export default CalcScreen;
