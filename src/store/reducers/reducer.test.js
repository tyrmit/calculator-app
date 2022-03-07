import reducer, { initialState, performCalc } from './reducer';
import { pressKey } from '../actions/calcActions';

describe('performCalc function returns the correct results', () => {
    it('returns 3 for 1.5 + 1.5', () => {
        const result = performCalc(1.5, 1.5, '+', 10);
        expect(result).toEqual(3);
    });

    it('returns 25 for 2.5 * 10', () => {
        const result = performCalc(2.5, 10, 'x', 10);
        expect(result).toEqual(25);
    });

    it('returns 11.1111 for 100 / 9', () => {
        const result = performCalc(100, 9, '/', 10);
        expect(result.toFixed(4)).toEqual('11.1111');
    });

    it('returns 15.2 for 25.5 - 10.35', () => {
        const result = performCalc(25.5, 10.35, '-', 100);
        expect(result).toEqual(15.15);
    });
});

describe('reducer returns correct state', () => {
    it('calculates the correct total (15.25) for addition and subtraction (5 + 20.5 - 10.25)', () => {
        let state = reducer(undefined, pressKey('5'));
        state = reducer(state, pressKey('+'));

        expect(state.currentScreenText).toEqual('5');

        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('.'));
        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('-'));

        expect(state.currentScreenText).toEqual('25.5');

        state = reducer(state, pressKey('1'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('.'));
        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('='));

        expect(state.currentScreenText).toEqual('15.25');
    });

    it('calculates the correct total (1,250.625) for multiply and divide (2.5 x 3 / 2 x 1000.5 / 3)', () => {
        let state = reducer(undefined, pressKey('2'));
        state = reducer(state, pressKey('.'));
        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('x'));

        expect(state.currentScreenText).toEqual('2.5');

        state = reducer(state, pressKey('3'));
        state = reducer(state, pressKey('/'));

        expect(state.currentScreenText).toEqual('7.5');

        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('x'));

        expect(state.currentScreenText).toEqual('3.75');

        state = reducer(state, pressKey('1'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('.'));
        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('/'));

        expect(state.currentScreenText).toEqual('3,751.875');

        state = reducer(state, pressKey('3'));
        state = reducer(state, pressKey('='));

        expect(state.currentScreenText).toEqual('1,250.625');
    });

    it('calculates the correct total () for addition, multiply, divide and subtract ()', () => {
        let state = reducer(undefined, pressKey('2'));
        state = reducer(state, pressKey('+'));

        expect(state.currentScreenText).toEqual('2');

        state = reducer(state, pressKey('6'));
        state = reducer(state, pressKey('x'));

        expect(state.currentScreenText).toEqual('6');

        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('/'));

        expect(state.currentScreenText).toEqual('12');

        state = reducer(state, pressKey('3'));
        state = reducer(state, pressKey('-'));

        expect(state.currentScreenText).toEqual('6');

        state = reducer(state, pressKey('1'));
        state = reducer(state, pressKey('='));

        expect(state.currentScreenText).toEqual('5');
    });

    it('clears back to initial state when RESET button pressed', () => {
        let state = reducer(undefined, pressKey('5'));
        state = reducer(state, pressKey('+'));

        expect(state.currentScreenText).toEqual('5');

        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('0'));
        state = reducer(state, pressKey('.'));
        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('-'));

        expect(state.currentScreenText).toEqual('25.5');

        state = reducer(state, pressKey('RESET'));

        expect(state).toEqual(initialState);
    });

    it('removes last digit from number when DEL is pressed', () => {
        let state = reducer(undefined, pressKey('5'));
        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('3'));
        state = reducer(state, pressKey('4'));
        state = reducer(state, pressKey('9'));
        state = reducer(state, pressKey('8'));
        state = reducer(state, pressKey('7'));

        expect(state.currentScreenText).toEqual('5,234,987');

        state = reducer(state, pressKey('DEL'));

        expect(state.currentScreenText).toEqual('523,498');

        state = reducer(state, pressKey('DEL'));
        state = reducer(state, pressKey('DEL'));

        expect(state.currentScreenText).toEqual('5,234');

        state = reducer(state, pressKey('.'));

        expect(state.currentScreenText).toEqual('5,234');

        state = reducer(state, pressKey('5'));
        state = reducer(state, pressKey('8'));

        expect(state.currentScreenText).toEqual('5,234.58');

        state = reducer(state, pressKey('DEL'));

        expect(state.currentScreenText).toEqual('5,234.5');

        state = reducer(state, pressKey('DEL'));

        expect(state.currentScreenText).toEqual('5,234');

        state = reducer(state, pressKey('0'));

        expect(state.currentScreenText).toEqual('52,340');
    });

    it('applies parked value when = is pressed', () => {
        let state = reducer(undefined, pressKey('5'));
        state = reducer(state, pressKey('+'));
        state = reducer(state, pressKey('1'));
        state = reducer(state, pressKey('+'));
        state = reducer(state, pressKey('2'));
        state = reducer(state, pressKey('x'));
        state = reducer(state, pressKey('6'));
        state = reducer(state, pressKey('='));
        expect(state.currentScreenText).toEqual('18');
    });
});
