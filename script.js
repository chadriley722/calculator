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

// Test the functions in the console
console.log("Testing calculator functions:");
console.log("2 + 3 =", add(2, 3));        // Expected: 5
console.log("7 - 4 =", subtract(7, 4));   // Expected: 3
console.log("5 * 6 =", multiply(5, 6));   // Expected: 30
console.log("15 / 3 =", divide(15, 3));   // Expected: 5

// Uncomment to test error case
// console.log("5 / 0 =", divide(5, 0));  // Will throw an error
