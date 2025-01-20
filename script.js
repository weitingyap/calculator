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

// Register button input and display

const screen = document.querySelector("#screen")

let operands = [];
let operator = null;
let screenIsAns = false;

function getButtonType(event){
    const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const BINARY_OPERATORS = ['+', '-', '/', '*'];
    const UNARY_OPERATORS = ['+/-', '%'];
    const CANCEL = ['AC'];
    const EQUAL = ['=']; // can be a binary or unary operator

    const innerText = event.target.innerText;

    if (NUMBERS.includes(innerText)) return 'number';
    if (BINARY_OPERATORS.includes(innerText)) return 'binary_operator';
    if (UNARY_OPERATORS.includes(innerText)) return 'unary_operator';
    if (CANCEL.includes(innerText)) return 'cancel';
    if (EQUAL.includes(innerText)) return 'equal';
}

function initCalculator(){
    operands = [];
    operator = null;
    screenIsAns = false;
    clearScreen();
}

function saveScreenAsOperand(){
    // Take current string input and save as operand
    operands.push(Number(screen.innerText));
}

function clearScreen(){
    screen.innerText = "";
}

function appendToScreen(input){
    // number or decimal point input
    screen.innerText += input;
}

function showBinaryAnswer(ans){
    screen.innerText = ans;
    screenIsAns = true;
}

function showUnaryAnswer(ans){
    screen.innerText = ans;
}

function updateScreen(event){
    // Only number types are displayed on screen
    // Note: number input acts as string concatenation

    if (getButtonType(event) === 'number') {
        if (screenIsAns) clearScreen();
        appendToScreen(event.target.innerText);
    }

    // Binary operators cause either:
    // (a) If there is only one operand entered, for it to be stored
    // (b) If two operands have been entered, for the operations between them be executed

    if (getButtonType(event) === 'binary_operator'){
        saveScreenAsOperand();
        clearScreen();

        if (operands.length === 1) {
            operator = event.target.innerText;
        } else {                 // at least two operands
            [b, a] = [operands.pop(), operands.pop()]
            ans = operate(operator, a, b);
            operator = event.target.innerText;
            showBinaryAnswer(ans);
            saveScreenAsOperand();
        }
    }

    // Unary operators cause operation on current input
    if (getButtonType(event) === 'unary_operator'){
        a = Number(screen.innerText);
        unary_operator = event.target.innerText;
        ans = operate(unary_operator, a);
        showUnaryAnswer(ans);
    }

    // Equal operator can be unary or binary 
    // If there is only one operand, do nothing

    if (getButtonType(event) === 'equal'){
        if (operator != null) saveScreenAsOperand();
        if (operands.length > 1) {
            [b, a] = [operands.pop(), operands.pop()]
            ans = operate(operator, a, b);
            operator = event.target.innerText;
            clearScreen();
            showUnaryAnswer(ans);
            saveScreenAsOperand();
        }
    }

    // Clear calculator 

    if (getButtonType(event) === 'cancel') initCalculator();

}

pad.addEventListener('click', updateScreen);