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

        // Add class to decimal point button to disable more than one point
        if (newPadBtn.innerText === '.') newPadBtn.classList.add('point-btn');

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
        if (b == 0) return 'ERROR';
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
const pointBtn = document.querySelector('.point-btn');
const MAX_SCREEN_CHAR = 8;

let operands = [];
let operator = null;
let screenIsAns = false;

function getButtonType(event){
    const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const DECIMAL_POINT = ['.'];
    const BINARY_OPERATORS = ['+', '-', '/', '*'];
    const UNARY_OPERATORS = ['+/-', '%'];
    const CANCEL = ['AC'];
    const EQUAL = ['=']; // can be a binary or unary operator

    const innerText = event.target.innerText;

    if (NUMBERS.includes(innerText)) return 'number';
    if (DECIMAL_POINT.includes(innerText)) return 'point';
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

    pointBtn.disabled = false;
}

function clearScreen(){
    screen.innerText = "";
}

function appendToScreen(input){
    // number or decimal point input
    screen.innerText += input;
}

function showBinaryAnswer(ans){
    screen.innerText = roundToScreen(ans);
    screenIsAns = true;
}

function showUnaryAnswer(ans){
    screen.innerText = roundToScreen(ans);
}

function getScreenLength(){
    return screen.innerText.length;
}

function roundToScreen(output){
    if (String(output).length < MAX_SCREEN_CHAR){
        return output;
    }
    if (output % 1){ // output is a float
        outputArr = String(output).split('.');
        return output.toFixed(MAX_SCREEN_CHAR - outputArr[0].length - 1);
    } else if ( output > 0) {        // return max number
        return 99999999;
    } else {
        return -9999999;
    }
}

function processButton(event){
    switch (getButtonType(event)){

        // Only number types are displayed on screen
        // Note: number input acts as string concatenation
        case ('number'):
            if (screenIsAns) clearScreen;
            if (getScreenLength() < MAX_SCREEN_CHAR) appendToScreen(event.target.innerText);
            break;

        case ('point'):
            if (getScreenLength() < MAX_SCREEN_CHAR) appendToScreen(event.target.innerText);
            pointBtn.disabled = true;
            break;

        // Unary operators cause operation on current input
        case ('unary_operator'):
            a = Number(screen.innerText);
            unary_operator = event.target.innerText;
            ans = operate(unary_operator, a);
            showUnaryAnswer(ans);
            break;

        // Binary operators cause either:
        // (a) If there is only one operand entered, for it to be stored
        // (b) If two operands have been entered, for the operations between them be executed

        case ('binary_operator'):
            saveScreenAsOperand();
            clearScreen();

            if (operands.length === 1) {
                operator = event.target.innerText;
            } else {                 // at least two operands
                [b, a] = [operands.pop(), operands.pop()]
                ans = operate(operator, a, b);
                showBinaryAnswer(ans);
                saveScreenAsOperand();
                operator = event.target.innerText;
            }

            break;

        case ('equal'):
            if (operator != null) saveScreenAsOperand();
            if (operands.length > 1) {
                [b, a] = [operands.pop(), operands.pop()]
                ans = operate(operator, a, b);
                operator = null;
                showBinaryAnswer(ans);
            }
            break;

        case ('cancel'):
            initCalculator();
            break;
    }
}

pad.addEventListener('click', processButton);