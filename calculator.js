// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


import { operate } from './operations.js'


let displayValue = '';
let firstValue = '';
let secondValue = '';
let operator = '';
let operatorClicked = false;


const display = document.querySelector('.display-content');
const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (operatorClicked)
        {
            displayValue = '';
            operatorClicked = false;
        }

        displayValue += this.value;
        display.textContent = displayValue;
    });
});


const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        firstValue = parseInt(displayValue);
        operator = button.value;
        operatorClicked = true;
    });
});


const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', function() {
    if (firstValue && !operatorClicked)
    {
        secondValue = parseInt(displayValue);
        displayValue = operate(firstValue, secondValue, operator);
        display.textContent = displayValue;
        operatorClicked = true;
    }
});


const clearButton = document.querySelector('.func-clear');
clearButton.addEventListener('click', function() {
    firstValue = secondValue = '';
    displayValue = 0;
    operatorClicked = false;

    display.textContent = displayValue;
});