import CalcHeader from './components/CalcHeader/CalcHeader';
import CalcKeypad from './components/CalcKeypad/CalcKeypad';
import CalcScreen from './components/CalcScreen/CalcScreen';

import classes from './App.module.css';
import { useSelector } from 'react-redux';

function App() {
    const themeID = useSelector((state) => state.currentTheme);

    return (
        <main className={[classes.App, classes[`Theme${themeID}`]].join(' ')}>
            <div className={classes.Calc}>
                <CalcHeader theme={themeID}></CalcHeader>
                <CalcScreen theme={themeID}></CalcScreen>
                <CalcKeypad theme={themeID}></CalcKeypad>
            </div>
        </main>
    );
}

export default App;
