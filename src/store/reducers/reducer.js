import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    currentTheme: 1,
    calcTotal: 0,
    currentScreenText: '0',
    currentInteger: 0,
    currentFraction: 0,
    lastOperator: null,
    lastOperand: 0,
    decimalPressed: false,
    fractionOrderOfMag: 1,
    lastFractionOrderOfMag: 1,
    parkedTotal: 0,
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
        default:
            return state;
    }
};

const resetHelper = (state) => initialState;

const numKeyHelper = (state, action) => {
    if (state.currentScreenText.length < 10) {
        let num = state.currentInteger;
        let fraction = state.currentFraction;
        let orderOfMag = state.fractionOrderOfMag;
        let screenText = '';

        if (!state.decimalPressed) {
            num = num * 10 + +action.key;
            screenText = `${formatNumber(num)}`;
        } else {
            orderOfMag = orderOfMag * 10;
            fraction += +action.key / orderOfMag;
            screenText = `${formatNumber(num + fraction)}`;
        }

        return {
            ...state,
            currentInteger: num,
            currentScreenText: screenText,
            currentFraction: fraction,
            fractionOrderOfMag: orderOfMag,
        };
    } else {
        return state;
    }
};

const delKeyHelper = (state) => {
    if (state.currentScreenText !== '0') {
        let num = state.currentInteger;
        let fraction = state.currentFraction;
        let orderOfMag = state.fractionOrderOfMag;
        let dotPressed = state.decimalPressed;
        let screenText = '';

        if (!dotPressed) {
            num = Number.parseInt(num / 10);
            screenText = `${formatNumber(num)}`;
        } else {
            /**
             * Couple of steps to remove the last digit from the fraction. Could have done this through string
             * methods but that's not consistent with the general approach throughout this module.
             * 1. Convert the fraction to a whole number/integer. This can be done by multiplying by the orderOfMag
             * 2. The whole number is then divided by 10 (so the last digit is a 1/10 fraction) and truncate the fraction
             *    part (at this point, the last digit is gone)
             * 3. Reduce the orderOfMag by a factor of 10
             * 4. Divide the fraction by the new orderOfMag value, which brings it back to a fraction again
             */

            let fracToWhole = Number.parseInt((fraction * orderOfMag) / 10);
            orderOfMag /= 10;
            fraction = fracToWhole / orderOfMag;
            screenText = `${formatNumber(num + fraction)}`;

            if (fraction === 0) dotPressed = false;
        }

        return {
            ...state,
            currentInteger: num,
            currentScreenText: screenText,
            currentFraction: fraction,
            fractionOrderOfMag: orderOfMag,
            decimalPressed: dotPressed,
        };
    } else {
        return state;
    }
};

const opKeyHelper = (state, action) => {
    // If there's no lastOperator, then this is the first time an operator was pressed
    // which means we only have the first operand. We therefore don't have any calculation
    // to perform yet, so we can just return the updated state.
    if (!state.lastOperator) {
        return {
            ...state,
            calcTotal: state.currentInteger + state.currentFraction,
            lastOperator: action.key,
            lastOperand: state.currentInteger + state.currentFraction,
            lastFractionOrderOfMag: state.fractionOrderOfMag,
            currentInteger: 0,
            currentFraction: 0,
            fractionOrderOfMag: 1,
            decimalPressed: false,
        };
    }

    // If we get here then we have two operands, so pull all the values out of the state and action for use
    let nextOp = action.key;
    let calcTotal = state.calcTotal;
    let lastOperand = state.lastOperand;
    let parkedValue = state.parkedTotal;
    const lastOp = state.lastOperator;
    const currOperand = state.currentInteger + state.currentFraction;
    const orderOfMag = Math.max(
        state.fractionOrderOfMag,
        state.lastFractionOrderOfMag
    );

    // Now that we have all the values from state, simplify the calculation by specifying the
    // operands. These will be adjusted further below depending on the scenario.
    let operand1 = calcTotal;
    let operand2 = currOperand;
    let isParked = false;

    // Check the order of operations
    if (
        (nextOp === 'x' || nextOp === '/') &&
        (lastOp === '+' || lastOp === '-')
    ) {
        // Either x or / was pressed, but the last operation was + or -
        // This means that we need to park the calculation for later, since * and / take
        // precedence.
        parkedValue = calcTotal;
        operand1 = lastOperand;
        calcTotal = currOperand;
        isParked = true;
    }

    // If we're not parking the calculation, we can do it here
    if (!isParked)
        calcTotal = performCalc(operand1, operand2, lastOp, orderOfMag);

    // Checking the order of operations again after the calculation
    if (
        (nextOp === '+' || nextOp === '-') &&
        (lastOp === 'x' || lastOp === '/')
    ) {
        // if the current operation is a + or -, but the last one was * or /, then we
        // can take the parked value out apply it to the total, since + and - don't take
        // precedence over any other operations.
        calcTotal += parkedValue;
        parkedValue = 0;
    }

    // If the = key was pressed, then there is no further calculation so we no longer need
    // the lastOperand. If not, then we need to save the current one to the lastOperand value.
    if (nextOp === '=') {
        lastOperand = 0;
        nextOp = null;
    } else {
        lastOperand = currOperand;
    }

    // Now we're at the end, so return the state
    return {
        ...state,
        calcTotal: calcTotal,
        currentScreenText: `${formatNumber(calcTotal)}`,
        lastOperator: nextOp,
        lastOperand: lastOperand,
        currentInteger: 0,
        decimalPressed: false,
        currentFraction: 0,
        fractionOrderOfMag: 1,
        lastFractionOrderOfMag: orderOfMag,
        parkedTotal: parkedValue,
    };
};

export const performCalc = (operand1, operand2, operator, orderOfMag) => {
    // Performs the calculation based on the operator. For + and - ops, we multiply by the
    // order of magnitude to remove decimal places. This is to work around the 0.1 + 0.2 !== 0.3 problem
    // NOTE: exported for testing only
    let calcResult = 0;
    switch (operator) {
        case '+':
            // Need to multiply both numbers by order of mag, then divide the result, to cope with floating precision
            calcResult =
                Math.round(operand1 * orderOfMag + operand2 * orderOfMag) /
                orderOfMag;
            break;
        case '-':
            calcResult =
                Math.round(operand1 * orderOfMag - operand2 * orderOfMag) /
                orderOfMag;
            break;
        case 'x':
            calcResult = operand1 * operand2;
            break;
        case '/':
            calcResult = operand1 / operand2;
            break;
        default:
            break;
    }

    return calcResult;
};

const formatNumber = (num) =>
    Number(num).toLocaleString(undefined, { maximumFractionDigits: 5 });

export default reducer;
