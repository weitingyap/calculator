// Create calculator buttons using loops because of repetitive nature

const pad = document.querySelector('#pad');

const padRow = document.createElement('div');
padRow.classList.add('pad-row');

const padBtn = document.createElement('button');
padBtn.classList.add('pad-btn');

const nBtnPerRow = 4;
const nRows = 5;
const calcButtons = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    [' ', '0', '.', '=']
]

for (let i = 0; i < nRows; i++){
    const newPadRow = padRow.cloneNode(false);
    pad.appendChild(newPadRow);
    for (let j = 0; j < nBtnPerRow; j++){
        const newPadBtn = padBtn.cloneNode(false);
        newPadBtn.innerText = calcButtons[i][j];

        // Blank extra button
        if (newPadBtn.innerText === ' ') newPadBtn.disabled = true;

        // Style clear button red
        if (newPadBtn.innerText === 'AC') newPadBtn.classList.add('ac-btn');

        newPadRow.appendChild(newPadBtn);
    }
}

// Register button input and display

const screen = document.querySelector("#screen")

function getButtonType(event){
    const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const BINARY_OPERATORS = ['+', '-', '/', '*'];
    const UNARY_OPERATORS = ['+/-', '%'];
    const CANCEL = ['a/c'];
    const EQUAL = ['=']; // can be a binary or unary operator

    const innerText = event.target.innerText;

    if (NUMBERS.includes(innerText)) return 'number';
    if (BINARY_OPERATORS.includes(innerText)) return 'binary_operator';
    if (UNARY_OPERATORS.includes(innerText)) return 'unary_operator';
    if (CANCEL.includes(innerText)) return 'cancel';
    if (EQUAL.includes(innerText)) return 'equal';
}

function updateScreen(event){
    // Only number types are displayed on screen
    // Note: number input acts as string concatenation
    
    if (getButtonType(event) === 'number') screen.innerText += event.target.innerText;
}

pad.addEventListener('click', updateScreen);

// Apply math operations (+, -, /, *) to two operands

function operate(operator, a, b){
    function add(a, b){
        return a+b;
    }
    
    function substract(a, b){
        return a-b;
    }
    
    function divide(a, b){
        return a/b;
    }
    
    function multiply(a, b){
        return a*b;
    }

    function toPercent(a){
        return a/100;
    }

    function changeSigns(a){
        return -a;
    }

    switch (operator){
        case '+':
            return add(a,b);
        case '-':
            return substract(a,b);
        case '/':
            return divide(a,b);
        case '*':
            return multiply(a,b);
        case '%':
            return toPercent(a);
        case '+/-':
            return changeSigns(a);
    }
}