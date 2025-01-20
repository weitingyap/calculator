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