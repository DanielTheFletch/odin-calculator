// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


// Required mathematical operations
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => ((num2 === 0) ? 'ERROR' : (num1 / num2));


// Additional binary operations
const nthPower = (num1, num2) => Math.pow(num1, num2);
const nthRoot = (num1, num2) => Math.pow(num1, (1 / num2));


// Parse and perform specified operation
function operate(num1, num2, operation) {
    switch (operation)
    {
        case 'add':         return add(num1, num2);
        case 'subtract':    return subtract(num1, num2);
        case 'multiply':    return multiply(num1, num2);
        case 'divide':      return divide(num1, num2);

        case 'nth-power':   return nthPower(num1, num2);
        case 'nth-root':    return nthRoot(num1, num2);

        default:            return undefined;
    }
}


export { operate };