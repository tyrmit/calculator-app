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
