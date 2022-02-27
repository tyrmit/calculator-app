import * as actionTypes from './actionTypes';
import { changeTheme } from './calcActions';

describe('calcActions.changeTheme() calculates the correct next theme', () => {
    it('returns 3 if the current theme is 2', () => {
        const action = changeTheme(2);
        expect(action.type).toEqual(actionTypes.CHANGE_THEME);
        expect(action.newTheme).toEqual(3);
    });

    it('returns 1 if the current theme is 3', () => {
        const action = changeTheme(3);
        expect(action.type).toEqual(actionTypes.CHANGE_THEME);
        expect(action.newTheme).toEqual(1);
    });

    it('returns 2 if the current theme is 1', () => {
        const action = changeTheme(1);
        expect(action.type).toEqual(actionTypes.CHANGE_THEME);
        expect(action.newTheme).toEqual(2);
    });
});
