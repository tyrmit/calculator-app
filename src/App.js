import CalcHeader from './components/CalcHeader/CalcHeader';
import CalcKeypad from './components/CalcKeypad/CalcKeypad';
import CalcScreen from './components/CalcScreen/CalcScreen';

import classes from './App.module.css';
import { useState } from 'react';

function App() {
    const [themeID, setThemeID] = useState(1);
    const handleThemeUpdate = () => {
        let newThemeID = themeID + 1;
        if (newThemeID > 3) newThemeID = 1;
        setThemeID(newThemeID);
    };

    return (
        <main className={[classes.App, classes[`Theme${themeID}`]].join(' ')}>
            <div className={classes.Calc}>
                <CalcHeader
                    theme={themeID}
                    themeUpdate={handleThemeUpdate}
                ></CalcHeader>
                <CalcScreen theme={themeID}></CalcScreen>
                <CalcKeypad theme={themeID}></CalcKeypad>
            </div>
        </main>
    );
}

export default App;
