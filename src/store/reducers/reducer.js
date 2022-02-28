import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
    currentTheme: 1,
    calcTotal: 0,
    currentScreenText: '0',
    lastOperator: null,
    lastOperand: 0,
    currentOperand: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_THEME:
            return { ...state, currentTheme: action.newTheme };
        case actionTypes.PRESS_RESET_KEY:
            return resetHelper(state);
        case actionTypes.PRESS_NUM_KEY:
            return numKeyHelper(state, action);
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
});

const numKeyHelper = (state, action) => {
    if (state.currentScreenText.length < 10) {
        let num = state.currentOperand;
        num = num * 10 + +action.key;

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
