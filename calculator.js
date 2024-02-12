// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


// Delegate mathematical logic to separate file
import { operate } from './operations.js'


// State management: Variables
const state = {
    display: '',
    first: '',
    second: '',
    operator: '',
};


// State management: Functions
const updateFirst = () => state.first = parseFloat(state.display);
const updateSecond = () => state.second = parseFloat(state.display);
const clearDisplay = () => state.display = '';


// Status of current operation
const operation = {
    complete: false,
    inProgress: false,
    selected: false,
    unaryExecuted: false,
};



// Update the display area on the DOM Tree
const displayArea = document.querySelector('.display-content');
const updateDisplayArea = () => displayArea.textContent = state.display;


// Compute the currently in-progress operation
function compute(num1, operator, num2 = '') {
    let result = operate(num1, num2, operator);

    // Truncate to 10 digits on display
    if (typeof result === 'number' && result.toString().length > 10)
        result = result.toString().substring(0, 10);

    state.display = result;

    updateDisplayArea();
}


// Set up 0-9 digit buttons
const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Reset display on new operand
        if (operation.selected || operation.complete || operation.unaryExecuted)
        {
            clearDisplay();
            operation.selected = false;
            operation.complete = false;
            operation.unaryExecuted = false;
        }

        // Check for decimal insertion
        const validDecimal = this.value === '.' && !state.display.includes('.');
        const validDigit = this.value !== '.' && state.display.length < 10;

        // Track and display current operand
        if (validDigit || validDecimal)
        {
            if (validDecimal && !state.display)
                state.display += '0';

            state.display += this.value;
            updateDisplayArea();
        }
    });
});


// Set up unary operator buttons (x ^ 2, sqrt(x), x!, 1/x, log x, ln x)
const unaryOperatorButtons = document.querySelectorAll('.operator-unary');
unaryOperatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (!operation.selected && state.display)
        {
            // Instantly perform operation on display value
            const unaryOperator = this.value;
            const unaryOperand = state.display;
            compute(unaryOperand, unaryOperator);
            operation.unaryExecuted = true;
        }
    });
});


// Set up binary operator buttons (+, -, *, /, x ^ y, y root x)
const binaryOperatorButtons = document.querySelectorAll('.operator-binary');
binaryOperatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (!operation.selected && state.display)
        {
            // Allow for chaining multiple operations together
            if (operation.inProgress)
            {
                // Check for unary operator usage
                if (operation.unaryExecuted)
                    operation.unaryExecuted = false;
                
                // Perform intermediary calculation
                updateSecond();
                compute(state.first, state.operator, state.second);
            }
            
            // Update values for mid-operation status
            updateFirst();
            operation.inProgress = true;
            operation.selected = true;
            state.operator = this.value;
        }
    });
});


// Set up equals (=) function
const equalsButton = document.querySelector('.func-equals');
equalsButton.addEventListener('click', function() {
    if (operation.inProgress && !operation.selected)
    {
        // Check for unary operator usage
        if (operation.unaryExecuted)
            operation.unaryExecuted = false;

        // Perform final calculation
        updateSecond();
        compute(state.first, state.operator, state.second);

        // Update values for end-of-operation status
        operation.inProgress = false;
        operation.complete = true;
    }
});


// Set up clear (AC) function
const clearButton = document.querySelector('.func-clear');
clearButton.addEventListener('click', function() {
    state.first = '';
    state.second = '';
    clearDisplay();
    state.operator = '';
    displayArea.textContent = '0';
});


// Set up sign toggle (+/-) function
const toggleButton = document.querySelector('.func-sign-toggle');
toggleButton.addEventListener('click', function() {
    if (state.display && !operation.selected)
    {
        if (state.display.startsWith('-'))
            state.display = state.display.substring(1);
        else
            state.display = '-' + state.display;

        updateDisplayArea();
    }
});