// Calculator state
let firstNumber = '';      // First number in the operation
let operator = '';         // The operator (+, -, *, /)
let secondNumber = '';     // Second number in the operation
let resetScreen = false;   // Flag to know when to reset the display

// Basic math operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

/**
 * Performs a calculation based on the operator and two numbers
 * @param {string} operator - The operation to perform (+, -, *, /)
 * @param {number|string} a - First number
 * @param {number|string} b - Second number
 * @returns {number} The result of the operation
 * @throws {Error} If division by zero is attempted
 */
function operate(operator, a, b) {
    const numA = typeof a === 'string' ? parseFloat(a) : a;
    const numB = typeof b === 'string' ? parseFloat(b) : b;
    
    if (isNaN(numA) || isNaN(numB)) {
        throw new Error('Both arguments must be valid numbers');
    }
    
    switch (operator) {
        case '+':
            return add(numA, numB);
        case '-':
            return subtract(numA, numB);
        case '*':
            return multiply(numA, numB);
        case '/':
            if (numB === 0) {
                throw new Error('Division by zero is not allowed');
            }
            return divide(numA, numB);
        default:
            throw new Error('Invalid operator');
    }
}

// Test the operation with variables
function testOperation(num1, op, num2) {
    try {
        const result = operate(op, num1, num2);
        console.log(`${num1} ${op} ${num2} = ${result}`);
        return result;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return null;
    }
}

// Test the functions in the console
console.log("Testing calculator functions:");
console.log("2 + 3 =", add(2, 3));        // Expected: 5
console.log("7 - 4 =", subtract(7, 4));   // Expected: 3
console.log("5 * 6 =", multiply(5, 6));   // Expected: 30
console.log("15 / 3 =", divide(15, 3));   // Expected: 5

// Test the operation function
console.log("\nTesting operation function:");
console.log("3 + 5 =", operate('+', 3, 5));      // Should return: 8
console.log("10 - 7 =", operate('-', 10, 7));    // Should return: 3
console.log("4 * 6 =", operate('*', 4, 6));      // Should return: 24
console.log("20 / 5 =", operate('/', 20, 5));    // Should return: 4

// Test with string numbers
console.log("\nTesting with string numbers:");
console.log("'10' + '5' =", operate('+', '10', '5'));  // Should return: 15

// Test error handling
try {
    console.log("\nTesting division by zero:");
    console.log(operate('/', 5, 0));  // Should throw an error
} catch (error) {
    console.log(`Caught error: ${error.message}`);
}

try {
    console.log("\nTesting invalid operator:");
    console.log(operate('^', 2, 3));  // Should throw an error
} catch (error) {
    console.log(`Caught error: ${error.message}`);
}

// Test the testOperation helper function
console.log("\nTesting testOperation helper:");
testOperation(3, '+', 5);    // Should log: 3 + 5 = 8
testOperation(10, '-', 7);  // Should log: 10 - 7 = 3
testOperation(4, '*', 6);   // Should log: 4 * 6 = 24
testOperation(20, '/', 5);  // Should log: 20 / 5 = 4
testOperation(5, '/', 0);   // Should log an error message
