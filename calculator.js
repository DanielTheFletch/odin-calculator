// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


// Delegate mathematical logic to separate file
import { operate } from './operations.js'


// State management
const state = {
    display: '',
    first: '',
    second: '',
    operator: '',
    operatorClicked: false
};


// Set up 0-9 digit buttons
const display = document.querySelector('.display-content');
const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (state.operatorClicked)
        {
            state.display = '';
            state.operatorClicked = false;
        }

        state.display += this.value;
        display.textContent = state.display;
    });
});


// Set up operator (+, -, *, /) buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        state.first = parseInt(state.display);
        state.operator = button.value;
        state.operatorClicked = true;
    });
});


// Set up equals (=) function
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', function() {
    if (state.first && !state.operatorClicked)
    {
        state.second = parseInt(state.display);
        state.display = operate(state.first, state.second, state.operator);
        display.textContent = state.display;
        state.operatorClicked = true;
    }
});


// Set up clear (AC) function
const clearButton = document.querySelector('.func-clear');
clearButton.addEventListener('click', function() {
    state.first = state.second = '';
    state.display = 0;
    state.operatorClicked = false;

    display.textContent = state.display;
});