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
    selected: false
};



// Update the display area on the DOM Tree
const displayArea = document.querySelector('.display-content');
const updateDisplayArea = () => displayArea.textContent = state.display;


// Compute the currently in-progress operation
function compute() {
    let result = operate(state.first, state.second, state.operator).toString();

    // Truncate to 10 digits on display
    if (result.length > 10)
        result = result.substring(0, 10);

    state.display = result;

    updateDisplayArea();
}


// Set up 0-9 digit buttons
const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Reset display on new operand
        if (operation.selected || operation.complete)
        {
            clearDisplay();
            operation.selected = false;
            operation.complete = false;
        }

        // Check for decimal insertion
        const validDecimal = this.value === '.' && !state.display.includes('.');
        const validDigit = this.value !== '.' && state.display.length < 10;

        // Track and display current operand
        if (validDigit || validDecimal)
        {
            state.display += this.value;
            updateDisplayArea();
        }
    });
});


// Set up operator (+, -, *, /) buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (!operation.selected && state.display)
        {
            // Allow for chaining multiple operations together
            if (operation.inProgress)
            {
                // Perform intermediary calculation
                updateSecond();
                compute();
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
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', function() {
    if (operation.inProgress && !operation.selected)
    {
        // Perform final calculation
        updateSecond();
        compute();

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