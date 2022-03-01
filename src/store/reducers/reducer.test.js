import { performCalc, opKeyHelper } from './reducer';

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

describe('opKeyHelper returns the correct state', () => {
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
        parkedTotal: 0,
    };

    it('returns 2 when adding 1 + 1', () => {
        const state = {
            ...initialState,
            lastOperand: 1,
            currentInteger: 1,
            lastOperator: '+',
            calcTotal: 1,
        };

        const result = opKeyHelper(state, { key: '=' });
        expect(result.currentScreenText).toEqual('2');
    });
});
