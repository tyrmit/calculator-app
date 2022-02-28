import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentTheme: 1,
    calcTotal: 0,
    currentScreenText: '0',
    lastOperator: null,
    lastOperand: 0,
    currentOperand: 0,
    decimalPressed: false,
    currentMantissa: 0,
    fractionOrderOfMag: 1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_THEME:
            return { ...state, currentTheme: action.newTheme };
        case actionTypes.PRESS_RESET_KEY:
            return resetHelper(state);
        case actionTypes.PRESS_NUM_KEY:
            return numKeyHelper(state, action);
        case actionTypes.PRESS_DEL_KEY:
            return delKeyHelper(state);
        case actionTypes.PRESS_DOT_KEY:
            return { ...state, decimalPressed: true };
        default:
            return state;
    }
};

const resetHelper = (state) => ({
    ...state,
    calcTotal: 0,
    currentScreenText: '0',
    lastOperator: null,
    lastOperand: 0,
    currentOperand: 0,
    decimalPressed: false,
    currentMantissa: 0,
    fractionOrderOfMag: 1,
});

const numKeyHelper = (state, action) => {
    if (state.currentScreenText.length < 10) {
        let num = state.currentOperand;
        let mantissa = state.currentMantissa;
        let orderOfMag = state.fractionOrderOfMag;
        let screenText = '';

        if (!state.decimalPressed) {
            num = num * 10 + +action.key;
            screenText = `${num}`;
        } else {
            orderOfMag = orderOfMag * 10;
            mantissa += +action.key / orderOfMag;
            screenText = `${num + mantissa}`;
        }

        return {
            ...state,
            currentOperand: num,
            currentScreenText: screenText,
            currentMantissa: mantissa,
            fractionOrderOfMag: orderOfMag,
        };
    } else {
        return state;
    }
};

const delKeyHelper = (state) => {
    if (state.currentScreenText !== '0') {
        let num = state.currentOperand;
        num = Number.parseInt(num / 10);

        return {
            ...state,
            currentOperand: num,
            currentScreenText: `${num}`,
        };
    } else {
        return state;
    }
};

export default reducer;
