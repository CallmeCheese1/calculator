let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let newNumber = true;
const numbersDisplay = document.querySelector("#number-display")

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
    return a / b;
}

function operate(num, operand, num2) {
    switch (operand) {
        case "+":
            return add(num1, num2)
            break;
            
        case "-":
            return subtract(num1, num2)
            break;

        case "*":
            return multiply(num1, num2)
            break;

        case "/":
            return divide(num1, num2)
            break;

        default:
            throw new Error(`Unknown Operand: ${operand}`)
            return 0;
    }
}

function clearCalculator() {
    numbersDisplay.innerHTML = "0"
    firstNumber = 0;
    secondNumber = 0;
    operand = "";
}

const numberButtons = document.querySelectorAll(".number-button")

numberButtons.forEach(function(button) {
    button.addEventListener("click", () => {
        if (numbersDisplay.innerHTML === "0" || newNumber === true) {
            numbersDisplay.innerHTML = button.innerText
            return
        }

        numbersDisplay.innerHTML += button.innerText

        //alert(numbersDisplay.innerHTML)
    })
})

const clearButton = document.querySelector("#clear-button")
clearButton.addEventListener("click", () => {
    clearCalculator();
})

const operandButtons = document.querySelectorAll(".operand-button")
operandButtons.forEach((button) => {
    firstNumber = numbersDisplay.innerHTML
    
    switch (button.innerText) {
        case "+":
            operand = "+"
            console.log(operand)
            break;
        case "-":
            operand = "+"
            console.log(operand)
            break;
        case "%":
            operand = "/"
            console.log(operand)
            break;
        case "&times":
            operand = "*"
            console.log(operand)
            break;
        
    }
})