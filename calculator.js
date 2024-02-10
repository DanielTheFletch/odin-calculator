// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


import { operate } from './operations.js'


const state = {
    display: '',
    first: '',
    second: '',
    operator: '',
    operatorClicked: false
};


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


const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        state.first = parseInt(state.display);
        state.operator = button.value;
        state.operatorClicked = true;
    });
});


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


const clearButton = document.querySelector('.func-clear');
clearButton.addEventListener('click', function() {
    state.first = state.second = '';
    state.display = 0;
    state.operatorClicked = false;

    display.textContent = state.display;
});