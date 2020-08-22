const randomPinDisplay = document.querySelector('#random-pin');
const generatePinBtn = document.querySelector('#generate-pin-btn');
let calcInputNumber = document.querySelector('#calcInputNumber');
const submitBtn = document.querySelector('#submit-btn');
let tryLeft = document.querySelector('.action-left');
const errorTxt = document.querySelector('#errorTxt');
const successTxt = document.querySelector('#successTxt');
let inputNumbers = document.querySelectorAll('.number');
const removeSingleInputBtn = document.querySelector('#remove-single-input');
const clearBtn = document.querySelector('#clear');


errorTxt.style.display = 'none';
successTxt.style.display = 'none';
let totalCalcInput = 0;
let countAttemptToMatch = 0;


if (randomPinDisplay.innerHTML === '') {
    submitBtn.disabled = true;
    tryLeft.innerHTML = '';
    calcInputNumber.innerHTML = '';
    totalCalcInput = 0;
}

function generatePin() {
    let randomNumber = Math.floor(Math.random() * 9000) + 1000;
    randomPinDisplay.value = randomNumber;
    submitBtn.disabled = false;
    tryLeft.innerHTML = '3 try left';
    calcInputNumber.value = '';
    totalCalcInput = 0;
    errorTxt.style.display = 'none';
    successTxt.style.display = 'none';
}

function getInputNumbers(e) {
    if (randomPinDisplay.value === '') {
        calcInputNumber.value = '';
    } else {
        if (totalCalcInput <= 3) {
            calcInputNumber.value += e.target.textContent;
            totalCalcInput++;
        }
    }
}

function matchPinWithCalcInput() {
    if (calcInputNumber.value === '') {
        alert('Enter PIN First!');
    }
    else if(randomPinDisplay.value === calcInputNumber.value) {
        successTxt.style.display = 'block';
        errorTxt.style.display = 'none';
        tryLeft.innerHTML = '';
        randomPinDisplay.value = '';
        submitBtn.disabled = true;
        calcInputNumber.value = '';
    }
    else if (randomPinDisplay.value !== calcInputNumber.value) {
        errorTxt.style.display = 'block';
        calcInputNumber.value = '';
        totalCalcInput = 0;
        countAttemptToMatch++;
        if (countAttemptToMatch === 1) {
            tryLeft.innerHTML = '2 try left';
            calcInputNumber.value = '';
            totalCalcInput = 0;
        }
        else if (countAttemptToMatch === 2) {
            tryLeft.innerHTML = '1 try left';
            calcInputNumber.value = '';
            totalCalcInput = 0;
        }
        else if (countAttemptToMatch === 3) {
            tryLeft.innerHTML = '0 try left';
            calcInputNumber.value = '';
            totalCalcInput = 0;
            submitBtn.disabled = true;
            alert('Try again & generate pin');
            countAttemptToMatch = 0;
        }
    }
}

function clearAll() {
    calcInputNumber.value = '';
    totalCalcInput = 0;
}

function removeSingleInput() {
    let currentCalcInput = calcInputNumber.value.toString();
    if (currentCalcInput) {
        currentCalcInput = currentCalcInput.slice(0, currentCalcInput.length - 1);
        calcInputNumber.value = currentCalcInput;
        totalCalcInput--;
    }
}

for (let i = 0; i < inputNumbers.length; i++){
    inputNumbers[i].addEventListener('click', getInputNumbers);
}

generatePinBtn.addEventListener('click', generatePin);
submitBtn.addEventListener('click', matchPinWithCalcInput);
clearBtn.addEventListener('click', clearAll);
removeSingleInputBtn.addEventListener('click', removeSingleInput);

