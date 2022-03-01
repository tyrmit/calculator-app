import * as actionTypes from './actionTypes';

export const changeTheme = (currentThemeID) => {
    let themeID = currentThemeID + 1;

    if (themeID > 3) {
        themeID = 1;
    }

    return {
        type: actionTypes.CHANGE_THEME,
        newTheme: themeID,
    };
};

export const screenUpdated = (newDigit) => ({
    type: actionTypes.UPDATE_SCREEN,
    newDigit: newDigit,
});

export const pressKey = (key) => {
    if (Number.isInteger(+key)) {
        return { type: actionTypes.PRESS_NUM_KEY, key: key };
    } else {
        switch (key) {
            case 'RESET':
                return { type: actionTypes.PRESS_RESET_KEY };
            case 'DEL':
                return { type: actionTypes.PRESS_DEL_KEY };
            case '.':
                return { type: actionTypes.PRESS_DOT_KEY };
            // case '=':
            //     return { type: actionTypes.PRESS_EQUALS_KEY };
            // case '+':
            //     return { type: actionTypes.PRESS_PLUS_KEY };
            // case '-':
            //     return { type: actionTypes.PRESS_SUBTRACT_KEY };
            // case 'x':
            //     return { type: actionTypes.PRESS_MULTIPLY_KEY };
            // case '/':
            //     return { type: actionTypes.PRESS_DIVIDE_KEY };
            default:
                return { type: actionTypes.PRESS_OPERATOR_KEY, key: key };
        }
    }
};

// const pressOperator = (opAction) => {};
