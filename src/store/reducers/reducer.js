import * as actions from '../actions/actionTypes';

const initialState = {
    currentTheme: 1,
    calcTotal: 0,
    currentScreenText: '0',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_THEME:
            return { ...state, currentTheme: action.newTheme };
        default:
            return state;
    }
};

export default reducer;
