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

// Perform the calculation based on the operator and numbers
function operate() {
    if (!firstNumber || !operator || !secondNumber) return null;
    
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);
    
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Test the operation with variables
function testOperation(num1, op, num2) {
    firstNumber = num1.toString();
    operator = op;
    secondNumber = num2.toString();
    
    const result = operate();
    console.log(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
    return result;
}

// Test the functions in the console
console.log("Testing calculator functions:");
console.log("2 + 3 =", add(2, 3));        // Expected: 5
console.log("7 - 4 =", subtract(7, 4));   // Expected: 3
console.log("5 * 6 =", multiply(5, 6));   // Expected: 30
console.log("15 / 3 =", divide(15, 3));   // Expected: 5

// Test the operation function
console.log("\nTesting operation function:");
testOperation('3', '+', '5');    // Should log: 3 + 5 = 8
testOperation('10', '-', '7');  // Should log: 10 - 7 = 3
testOperation('4', '*', '6');    // Should log: 4 * 6 = 24
testOperation('20', '/', '5');   // Should log: 20 / 5 = 4

// Uncomment to test error case
// testOperation('5', '/', '0');  // Will throw an error
