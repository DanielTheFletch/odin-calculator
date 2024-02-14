// Daniel Fletcher
// The Odin Project: Foundations
// Calculator


// Required mathematical operations
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => ((y === 0) ? 'ERROR' : (x / y));


// Additional unary operations
const squared = x => Math.pow(x, 2);
const squareRoot = x => Math.sqrt(x);
const factorial = x => Number.isInteger(x) ? recursiveFactorial(x) : x;
const inverse = x => ((x === 0) ? 'ERROR' : (1 / x));
const log2 = x => Math.log2(x);
const ln = x => Math.log(x);


// Additional binary operations
const nthPower = (x, y) => Math.pow(x, y);
const nthRoot = (x, y) => Math.pow(x, (1 / y));


// Parse and perform specified operation
function operate(num1, num2, operation) {
    switch (operation)
    {
        case 'add':         return add(num1, num2);
        case 'subtract':    return subtract(num1, num2);
        case 'multiply':    return multiply(num1, num2);
        case 'divide':      return divide(num1, num2);

        case 'squared':     return squared(num1);
        case 'square-root': return squareRoot(num1);
        case 'factorial':   return factorial(num1);
        case 'inverse':     return inverse(num1);
        case 'log-base-2':  return log2(num1);
        case 'natural-log': return ln(num1);

        case 'nth-power':   return nthPower(num1, num2);
        case 'nth-root':    return nthRoot(num1, num2);

        default:            return undefined;
    }
}


// Recursive factorial implementation
function recursiveFactorial(n) {
    if (n === 0 || n === 1)
        return 1;
    else
        return n * recursiveFactorial(n - 1);
}


export { operate };