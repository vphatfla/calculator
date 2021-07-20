const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal');
const screen = document.getElementById('display');
const container = document.querySelector('.container');
let result = 0;
let operator = '+';
let calculatedCheck = false;

numberButtons.forEach( (numberButton) => 
numberButton.addEventListener('click', () => displayNumber(numberButton.textContent))
);
decimalButton.addEventListener('click', () =>displayNumber(decimalButton.textContent));
operationButtons.forEach( (operationButton) =>
operationButton.addEventListener('click', () => operation(operationButton.textContent))
);

clearButton.addEventListener('click', () => resetScreen());
deleteButton.addEventListener('click', () => deleteScreen());
equalButton.addEventListener('click', () => equalButtonDisplay());

document.addEventListener('keydown', function(event){
    
    numberKeyDown = parseInt(event.key);
    if ((numberKeyDown >= 0) && (numberKeyDown<=9)) {
        displayNumber(numberKeyDown);
    }

    switch (event.key){
        case 'Escape': 
            resetScreen();
            break;
        case 'Backspace':
            deleteScreen();
            break;
        case '=':
        case 'Enter':
            equalButtonDisplay();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            operation(event.key);
            break;
        case '.':
            displayNumber(event.key);
            break;
    }
});
function deleteScreen(){
    screen.textContent = screen.textContent.substring(0, screen.textContent.length-1);
}
function resetScreen(){
    operator = '+';
    result = 0;
    console.log(result, 'trigger reset');
    displayResult(result);
}


function displayNumber(content){
    if ((screen.textContent == 0) || ((result != 0) && (round(result) == round(screen.textContent) )) ) screen.textContent = content;
    else screen.textContent += content;
    calculatedCheck  = false;
}
function round(number){
    return Math.round(number*1000)/1000;
}
function displayResult(result){
    result = round(result);
    screen.textContent = result;
    console.log(result, 'trigger display')
}
function equalButtonDisplay(){
    if (!calculatedCheck) {
        let currentNumber = Number(screen.textContent);
        result = calculate(result, currentNumber, operator);
        calculatedCheck = true;
    }
    displayResult(result);
}
function operation(operatorSign){
    if (!calculatedCheck) {
        let currentNumber = Number(screen.textContent);
        result = calculate(result, currentNumber, operator);
        displayResult(result);
        calculatedCheck = true;
    }
    operator = operatorSign;
}

//color change function
let containerButtons = container.querySelectorAll('button');
containerButtons.forEach(containerButton => containerButton.addEventListener('mouseenter', corlorChange));
containerButtons.forEach(containerButton => containerButton.addEventListener('mouseleave', resetBackGroundButton));
function resetBackGroundButton(){
    this.style.backgroundColor = 'white';
}

function getRandomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i< 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function corlorChange(){
    this.style.backgroundColor = getRandomColor();
}

//call math functions
function calculate(a,b, operator){
   switch (operator){
    case '+' :
       console.log('plus');
       return plus(a,b);
       
       break;
    case '-':
        return minus(a,b);
        break;
    case '/':
        return devide(a,b);
        break;
    case 'x':
    case '*':
        return multiply(a,b);
        break;
    }
}
// math functions
function plus(a,b){
    return a+b;
}

function minus(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function devide(a,b){
    if (b==0) {
        alert('Never devided by 0');
        resetScreen();
        return 0;
    }
    return a/b;
}