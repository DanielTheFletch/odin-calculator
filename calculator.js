// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


// Required mathematical operations
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;


// Parse and perform specified operation
function operate(num1, num2, operator) {
    switch (operator)
    {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return undefined;
    }
}


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