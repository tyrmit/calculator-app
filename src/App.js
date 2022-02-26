import React from 'react';
import CalcHeader from './components/CalcHeader/CalcHeader';
import CalcKeypad from './components/CalcKeypad/CalcKeypad';
import CalcScreen from './components/CalcScreen/CalcScreen';

function App() {
    return (
        <React.Fragment>
            <CalcHeader></CalcHeader>
            <main>
                <CalcScreen></CalcScreen>
                <CalcKeypad></CalcKeypad>
            </main>
        </React.Fragment>
    );
}

export default App;
