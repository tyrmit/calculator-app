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
    } else if (key === 'RESET') {
        return { type: actionTypes.PRESS_RESET_KEY };
    } else if (key === 'DEL') {
        return { type: actionTypes.PRESS_DEL_KEY };
    }
};

// const pressOperator = (opAction) => {};
