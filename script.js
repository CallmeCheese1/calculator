let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let newNumber = false;
let answer = 0;
let writingSecondNumber = false;
const numbersDisplay = document.querySelector("#number-display")
const equalsButton = document.querySelector('#equals-button')

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

function operate(num1, operand, num2) {
    newNumber = true;
    decimalButton.disabled = false;
    console.log(`${firstNumber} ${operand} ${num2}`)
    
    switch (operand) {
        case "+":
            answer = add(num1, num2)
            numbersDisplay.innerHTML = answer;
            break;
            
        case "-":
            answer = subtract(num1, num2)
            numbersDisplay.innerHTML = answer;
            break;

        case "*":
            answer = multiply(num1, num2)
            numbersDisplay.innerHTML = answer;
            break;

        case "/":
            answer = divide(num1, num2)
            numbersDisplay.innerHTML = answer;
            break;

        default:
            throw new Error(`Unknown Operand: ${operand}`)
            return 0;
    }

    firstNumber = 0;
    secondNumber = 0;
    operand = "";
    writingSecondNumber = false;
}

function clearCalculator() {
    numbersDisplay.innerHTML = "0"
    firstNumber = 0;
    secondNumber = 0;
    operand = "";
    newNumber = true;
    decimalButton.disabled = false;
    writingSecondNumber = false;
    answer = 0;
}

const numberButtons = document.querySelectorAll(".number-button")

numberButtons.forEach(function(button) {
    button.addEventListener("click", () => {
        equalsButton.disabled = false;

        if (numbersDisplay.innerHTML === "-0") {
            numbersDisplay.innerHTML = `-${button.innerText}`
            newNumber = false;
            return
        }

        if (numbersDisplay.innerHTML === "0" || newNumber === true) {
            numbersDisplay.innerHTML = button.innerText
            newNumber = false;
            return
        }

        numbersDisplay.innerHTML += button.innerText
    })
})

const allClearButton = document.querySelector("#allclear-button")
allClearButton.addEventListener("click", () => {
    clearCalculator();
    equalsButton.disabled = false;
})

const operandButtons = document.querySelectorAll(".operand-button")
operandButtons.forEach((button) => {
    button.addEventListener("click", () => {
        equalsButton.disabled = false;

        if (!firstNumber) {
            firstNumber = Number(numbersDisplay.innerHTML)

            switch (button.id) {
                case "plus-button":
                    operand = "+"
                    console.log(operand)
                    break;
                case "subtract-button":
                    operand = "-"
                    console.log(operand)
                    break;
                case "division-button":
                    operand = "/"
                    console.log(operand)
                    break;
                case "multiply-button":
                    operand = "*"
                    console.log(operand)
                    break;
                default:
                    throw new Error(`Unknown Button Clicked: ${button}`)
            }

            console.log(`${firstNumber} ${operand} ...`)
            newNumber = true;
            decimalButton.disabled = false;
            writingSecondNumber = true;
        } else if (writingSecondNumber) {
            operate(firstNumber, operand, Number(numbersDisplay.innerHTML))
            firstNumber = answer;
            newNumber = true;
            decimalButton.disabled = false;
            writingSecondNumber = true;
        } else {
            operate(firstNumber, operand, Number(numbersDisplay.innerHTML))
        }
    })
})

equalsButton.addEventListener("click", () => {
    operate(firstNumber, operand, Number(numbersDisplay.innerHTML))
    equalsButton.disabled = true;
})

const negativeButton = document.querySelector("#negative-button")
negativeButton.addEventListener("click", () => {
    equalsButton.disabled = false;
    if (numbersDisplay.innerText.charAt(0) !== "-") {
        numbersDisplay.innerText = "-" + numbersDisplay.innerText
    } else {
        numbersDisplay.innerText = numbersDisplay.innerText.slice(1)
    }
})

const decimalButton = document.querySelector("#decimal-button")
decimalButton.addEventListener("click", () => {
    equalsButton.disabled = false;

    if (numbersDisplay.innerHTML === "0" || newNumber === true) {
        numbersDisplay.innerHTML = "0."
        newNumber = false;
        decimalButton.disabled = true;
        return
    }

    numbersDisplay.innerHTML += "."
    decimalButton.disabled = true;

})

const clearButton = document.querySelector("#clear-button")
clearButton.addEventListener("click", () => {
    if (numbersDisplay.innerHTML.length > 1) {
        numbersDisplay.innerHTML = numbersDisplay.innerHTML.slice(0, -1)
        return
    }

    numbersDisplay.innerHTML = "0";
})