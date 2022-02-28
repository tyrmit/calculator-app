import classes from './CalcKeypad.module.css';
import KeyButton from './KeyButton/KeyButton';

const CalcKeypad = ({ theme }) => {
    return (
        <section
            className={[classes.CalcKeypad, classes[`Theme${theme}`]].join(' ')}
        >
            <KeyButton theme={theme} size="Small" type="Normal">
                7
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                8
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                9
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Secondary">
                DEL
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                4
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                5
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                6
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                +
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                1
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                2
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                3
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                -
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                .
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                0
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                /
            </KeyButton>
            <KeyButton theme={theme} size="Small" type="Normal">
                x
            </KeyButton>
            <KeyButton theme={theme} size="Large" type="Secondary">
                RESET
            </KeyButton>
            <KeyButton theme={theme} size="Large" type="Primary">
                =
            </KeyButton>
        </section>
    );
};

export default CalcKeypad;
