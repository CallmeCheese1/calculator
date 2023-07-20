let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let newNumber = false;
let answer = 0;
let shouldCalculate = true;
let writingSecondNumber = false;
const MAX_DISPLAY_LENGTH = 7;
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

    if (operand === "/" && num2 === 0) {
        clearCalculator();
        decimalButton.disabled = true;
        equalsButton.disabled = true;
        newNumber = true;

        operandButtons.forEach((button) => {
            button.disabled = true;
        })

        numbersDisplay.innerText = "No."
        
    } else {
    
        switch (operand) {
            case "+":
                answer = add(num1, num2)
                updateDisplay(answer);
                break;
                
            case "-":
                answer = subtract(num1, num2)
                updateDisplay(answer);
                break;
    
            case "*":
                answer = multiply(num1, num2)
                updateDisplay(answer);
                break;
    
            case "/":
                answer = divide(num1, num2)
                updateDisplay(answer);
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
}

function clearCalculator() {
    console.log("Clearing everything!")
    updateDisplay("0")
    firstNumber = 0;
    secondNumber = 0;
    operand = "";
    newNumber = true;
    decimalButton.disabled = false;
    writingSecondNumber = false;
    shouldCalculate = true;
    answer = 0;
}

function updateDisplay(newValue) {
    let updatedValue = 0;
    if (newValue.toString().length > MAX_DISPLAY_LENGTH) {
        numbersDisplay.style.fontSize = "32px"
        
        console.log(`${newValue} is longer than the current display length, ${MAX_DISPLAY_LENGTH}. Truncating it to...`)

        updatedValue = Number(newValue).toPrecision(MAX_DISPLAY_LENGTH).toString();
        console.log(updatedValue)

        numbersDisplay.innerHTML = updatedValue
        return;
    }

    console.log(MAX_DISPLAY_LENGTH);
    console.log(newValue.toString().length);

    numbersDisplay.style.fontSize = "64px"

    numbersDisplay.innerHTML = newValue;
}

const numberButtons = document.querySelectorAll(".number-button")

numberButtons.forEach(function(button) {
    button.addEventListener("click", () => {
        equalsButton.disabled = false;
        operandButtons.forEach((button) => {
            button.disabled = false;
        })
        shouldCalculate = true;
        console.log(`shouldCalculate: ${shouldCalculate}`)

        if (numbersDisplay.innerHTML === "-0") {
            updateDisplay(`-${button.innerText}`)
            newNumber = false;
            return
        }

        if (numbersDisplay.innerHTML === "0" || newNumber === true) {
            updateDisplay(button.innerText)
            newNumber = false;
            return
        }

        updateDisplay(numbersDisplay.innerHTML + button.innerText)
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
        if(!shouldCalculate) {
            console.log("shouldCalculate is false, so we're not doing anything!")
            return;
        }

        equalsButton.disabled = true;

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
            shouldCalculate = false;
            console.log("We just clicked an operand, so shouldCalculate is now being set to false.")
        } else if (writingSecondNumber) {

            if (!operand) {
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
            }

            operate(firstNumber, operand, Number(numbersDisplay.innerHTML))

            firstNumber = answer;
            newNumber = true;
            decimalButton.disabled = false;
            writingSecondNumber = true;

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

            shouldCalculate = false;
            console.log("setting shouldCalculate to false!")
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
    if (newNumber === true) {
        numbersDisplay.innerText = "-0"
        return
    }
    
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
        updateDisplay("0.")
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
        updateDisplay(numbersDisplay.innerHTML.slice(0, -1))
        return
    }

    updateDisplay("0");
})