import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentTheme: 1,
    calcTotal: 0,
    currentScreenText: '0',
    currentInteger: 0,
    currentMantissa: 0,
    lastOperator: null,
    lastOperand: 0,
    decimalPressed: false,
    operatorPressed: false,
    fractionOrderOfMag: 1,
    lastFractionOrderOfMag: 1,
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
        case actionTypes.PRESS_OPERATOR_KEY:
            return opKeyHelper(state, action);
        // case actionTypes.PRESS_EQUALS_KEY:
        //     return equalsKeyHelper(state, action);
        // case actionTypes.PRESS_PLUS_KEY:
        //     return plusKeyHelper(state, action);
        // case actionTypes.PRESS_SUBTRACT_KEY:
        //     return subtractKeyHelper(state, action);
        // case actionTypes.PRESS_MULTIPLY_KEY:
        //     return multiplyKeyHelper(state, action);
        // case actionTypes.PRESS_DIVIDE_KEY:
        //     return divideKeyHelper(state, action);

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
    currentInteger: 0,
    decimalPressed: false,
    operatorPressed: false,
    currentMantissa: 0,
    fractionOrderOfMag: 1,
});

const numKeyHelper = (state, action) => {
    if (state.currentScreenText.length < 10) {
        let num = state.currentInteger;
        let mantissa = state.currentMantissa;
        let orderOfMag = state.fractionOrderOfMag;
        let screenText = '';
        let opPressed = state.operatorPressed;

        if (opPressed) {
            num = +action.key;
            opPressed = false;
        } else if (!state.decimalPressed) {
            num = num * 10 + +action.key;
            screenText = `${formatNumber(num)}`;
        } else {
            orderOfMag = orderOfMag * 10;
            mantissa += +action.key / orderOfMag;
            screenText = `${formatNumber(num + mantissa)}`;
        }

        return {
            ...state,
            currentInteger: num,
            currentScreenText: screenText,
            currentMantissa: mantissa,
            fractionOrderOfMag: orderOfMag,
            operatorPressed: opPressed,
        };
    } else {
        return state;
    }
};

const delKeyHelper = (state) => {
    if (state.currentScreenText !== '0') {
        let num = state.currentInteger;
        let mantissa = state.currentMantissa;
        let orderOfMag = state.fractionOrderOfMag;
        let dotPressed = state.decimalPressed;
        let screenText = '';

        if (!dotPressed) {
            num = Number.parseInt(num / 10);
            screenText = `${formatNumber(num)}`;
        } else {
            /**
             * Couple of steps to remove the last digit from the mantissa. Could have done this through string
             * methods but that's not consistent with the general approach throughout this module.
             * 1. Convert the mantissa to a whole number/integer. This can be done by multiplying by the orderOfMag
             * 2. The whole number is then divided by 10 (so the last digit is a 1/10 fraction) and truncate the fraction
             *    part (at this point, the last digit is gone)
             * 3. Reduce the orderOfMag by a factor of 10
             * 4. Divide the mantissa by the new orderOfMag value, which brings it back to a fraction again
             */

            let fracToWhole = Number.parseInt((mantissa * orderOfMag) / 10);
            orderOfMag /= 10;
            mantissa = fracToWhole / orderOfMag;
            screenText = `${formatNumber(num + mantissa)}`;

            if (mantissa === 0) dotPressed = false;
        }

        return {
            ...state,
            currentInteger: num,
            currentScreenText: screenText,
            currentMantissa: mantissa,
            fractionOrderOfMag: orderOfMag,
            decimalPressed: dotPressed,
        };
    } else {
        return state;
    }
};

const opKeyHelper = (state, action) => {
    if (!state.lastOperator) {
        return {
            ...state,
            lastOperator: action.key,
            lastOperand: state.currentInteger + state.currentMantissa,
            lastFractionOrderOfMag: state.fractionOrderOfMag,
            currentInteger: 0,
            currentMantissa: 0,
            fractionOrderOfMag: 1,
            decimalPressed: false,
        };
    }

    let calcResult;
    let calcTotal = state.calcTotal;
    let lastOperand = state.lastOperand;
    const { currentInteger, currentMantissa } = state;
    const nextOp = action.key === '=' ? null : action.key;
    const orderOfMag = Math.max(
        state.fractionOrderOfMag,
        state.lastFractionOrderOfMag
    );

    switch (state.lastOperator) {
        case '+':
            // Need to multiply both numbers by order of mag, then divide the result, to cope with floating precision
            calcResult =
                Math.round(
                    (currentInteger + currentMantissa) * orderOfMag +
                        lastOperand * orderOfMag
                ) / orderOfMag;
            calcTotal = calcResult;
            lastOperand = calcResult;
            break;

        case '-':
            calcResult =
                Math.round(
                    lastOperand * orderOfMag -
                        (currentInteger + currentMantissa) * orderOfMag
                ) / orderOfMag;
            calcTotal = calcResult;
            lastOperand = calcResult;
            break;

        default:
            break;
    }

    // console.log(calcResult, {
    //     operand1: state.lastOperand,
    //     operand2: currentInteger + currentMantissa,
    //     operation: state.lastOperator,
    //     orderOfMag: orderOfMag,
    // });

    return {
        ...state,
        calcTotal: calcTotal,
        currentScreenText: `${formatNumber(calcTotal)}`,
        lastOperator: nextOp,
        lastOperand: lastOperand,
        currentInteger: 0,
        decimalPressed: false,
        currentMantissa: 0,
        fractionOrderOfMag: 1,
        lastFractionOrderOfMag: orderOfMag,
    };
};

/*
    calcTotal: 0,
    currentScreenText: '0',
    lastOperator: null,
    lastOperand: 0,
    currentInteger: 0,
    decimalPressed: false,
    currentMantissa: 0,
    fractionOrderOfMag: 1,
};
*/

// const equalsKeyHelper = (state, action) => {};

// const plusKeyHelper = (state, action) => {};

// const subtractKeyHelper = (state, action) => {};

// const multiplyKeyHelper = (state, action) => {};

// const divideKeyHelper = (state, action) => {};

const formatNumber = (num) =>
    Number(num)
        .toString()
        .replace(/\d(?=(\d{3})+\.?)/g, '$&,');

export default reducer;
