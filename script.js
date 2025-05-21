// Calculator state
let firstNumber = '';      // First number in the operation
let operator = '';         // The operator (+, -, *, /)
let secondNumber = '';     // Second number in the operation
let resetScreen = false;   // Flag to know when to reset the display
let currentInput = '0';    // Current number being entered

// DOM Elements
const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.operator[value="="]');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

// Update the display
function updateDisplay() {
    // Limit the number of decimal places to 8 to prevent overflow
    const displayNumber = currentInput.includes('.') 
        ? parseFloat(currentInput).toFixed(8).replace(/\.?0+$/, '')
        : currentInput;
        
    currentOperandDisplay.textContent = displayNumber;
    
    // Update the previous operand display if we have an operator
    if (operator) {
        previousOperandDisplay.textContent = `${firstNumber} ${operator}`;
    } else {
        previousOperandDisplay.textContent = '';
    }
}

// Add a digit to the current input
function appendNumber(number) {
    // If we have a result displayed and no operator is set, start a new calculation
    if (!operator && firstNumber && !resetScreen) {
        clear();
    }
    
    // If the display shows '0' or we need to reset, replace it with the new number
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else if (currentInput.length < 12) { // Limit input length to prevent overflow
        // Otherwise, append the number to the current input
        currentInput += number;
    }
    updateDisplay();
}

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

// Handle operator button clicks
function handleOperator(newOperator) {
    // If we're in the middle of a calculation (have a first number and operator)
    // and the user presses another operator, calculate the result first
    if (firstNumber && operator && !resetScreen) {
        calculate();
    } else if (!firstNumber) {
        // If no first number yet, use the current input
        firstNumber = currentInput;
    }
    
    operator = newOperator;
    resetScreen = true;
    updateDisplay();
}

// Perform the calculation
function calculate() {
    // Don't calculate if we don't have all the required values
    if (operator === '' || firstNumber === '') return;
    
    // Don't calculate if we don't have a second number and the user didn't just press '='
    if (resetScreen && secondNumber === '') return;
    
    // If we have a second number, use it; otherwise, use the current input
    const secondNum = resetScreen ? secondNumber : currentInput;
    
    try {
        const result = operate(operator, firstNumber, secondNum);
        
        // Handle division by zero
        if (result === Infinity || isNaN(result)) {
            throw new Error('Nice try, but you can\'t divide by zero!');
        }
        
        // Update the display with the result
        currentInput = result.toString();
        firstNumber = currentInput; // Store the result as the first number for chaining
        secondNumber = secondNum; // Store the second number in case of chaining
        resetScreen = true;
        updateDisplay();
    } catch (error) {
        // Display error message
        currentOperandDisplay.textContent = error.message;
        // Reset the calculator after a short delay
        setTimeout(clear, 1500);
    }
}

// Clear the calculator
function clear() {
    currentInput = '0';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    resetScreen = false;
    updateDisplay();
}

// Handle decimal point
function inputDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        return;
    }
    
    // Only add a decimal if there isn't already one
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Delete the last digit
function deleteLastDigit() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else if (currentInput !== '0' && !resetScreen) {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Set up event listeners
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLastDigit);

// Add event listeners for operator buttons
operatorButtons.forEach(button => {
    // Skip the equals button as it's handled separately
    if (button.textContent !== '=') {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
        });
    } else {
        // Handle equals button
        button.addEventListener('click', () => {
            if (operator && firstNumber) {
                calculate();
            }
        });
    }
});

// Add event listener for decimal button
document.querySelector('.decimal').addEventListener('click', () => {
    if (resetScreen) {
        currentInput = '0';
        resetScreen = false;
    }
    inputDecimal();
    updateDisplay();
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        if (operator && firstNumber) {
            calculate();
        }
    } else if (e.key === '.') {
        inputDecimal();
        updateDisplay();
    } else if (e.key === 'Backspace') {
        deleteLastDigit();
    } else if (e.key === 'Escape') {
        clear();
    }
});

// Add decimal button class to the dot button
document.querySelector('.number:last-of-type').classList.add('decimal');

// Initialize the display
updateDisplay();

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
    let numB = typeof b === 'string' ? parseFloat(b) : b;
    
    if (isNaN(numA) || (b !== undefined && isNaN(numB))) {
        throw new Error('Invalid numbers provided');
    }
    
    // If we don't have a second number (happens when chaining operations),
    // use the first number as the second number
    if (b === undefined) {
        numB = numA;
    }
    
    let result;
    switch (operator) {
        case '+':
            result = add(numA, numB);
            break;
        case '-':
            result = subtract(numA, numB);
            break;
        case '*':
            result = multiply(numA, numB);
            break;
        case '×':
            result = multiply(numA, numB);
            break;
        case '/':
        case '÷':
            if (numB === 0) {
                throw new Error('Division by zero');
            }
            result = divide(numA, numB);
            break;
        default:
            throw new Error('Invalid operator');
    }
    
    // Round to 8 decimal places to avoid floating point errors
    return Math.round(result * 100000000) / 100000000;
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
