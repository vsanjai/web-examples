class Calculator {
    constructor(row1TextElement, row2TextElement) {
        this.row1TextElement = row1TextElement
        this.row2TextElement = row2TextElement
        this.clear()
    }

    clear() {
        this.row1 = ''
        this.row2 = ''
        row2TextElement.innerText = ''
        this.operation = undefined
    }

    delete() {

    }


    appendNumber(number) {
        if (number === '.' && this.row2.includes('.')) return
        this.row2 = this.row2.toString() + number.toString()
    }

    chooseOperation(operation) {

        this.row1 = this.row2
        this.row2 = '' 

    }


    compute() {

    }


    updateDisplay() {
        row2TextElement.innerText = this.row2
        row1TextElement.innerText = this.row1


    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-ac]')
const deleteButton = document.querySelector('[data-delete]')
const row1TextElement = document.querySelector('[data-row1]')
const row2TextElement = document.querySelector('[data-row2]')


const calculator = new Calculator(row1TextElement, row2TextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
}
)

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
}
)

acButton.addEventListener('click', () => {
    calculator.clear()
}
);





