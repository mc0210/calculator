/* basic arithmetic operations */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return b === 0 ? "Nice try, but no division by zero" : a/b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
}
// ------------------------------------------------------------------------------------------

/* initialize an empty display */
let display = '';

/* define list of mathematical operatorList */
let operatorList = ['/', '×', '-', '+'];
let fnOperatorList = ['divide', 'multiply', 'subtract', 'add'];

/* identify which button was clicked */
let elements = document.getElementsByTagName('button');
elements = Array.from(elements)
elements.forEach(element => element.addEventListener("click", findTargets));

/* upon button click */
function findTargets(e) {
    /* find id of button that was clicked */
    let selectedID = e.target.id;
    console.log('display type: ' + (typeof display));
    display = display.toString();

    /* do nothing for clicks on display */
    if (selectedID == 'display') {
        return;
    }

    else if (selectedID == "clear") {
        display = '0';
    }

    /* computation performed here */
    else if (selectedID == "=") {
        console.log(selectedID);
        /* find array of operators inside of the display string */
        let inputOperators = operatorList.filter(operator => display.includes(operator));
        console.table(inputOperators);
        console.log(inputOperators.length == 1);
        console.log('above');
        if (inputOperators.length) {
            console.log('really');
            operatorIndex = display.indexOf(inputOperators[0]);
            num1 = display.slice(0, operatorIndex);
            num2 = display.slice(operatorIndex + 1);
            let fnIndex = operatorList.indexOf(inputOperators[0]);
            let fnOperator = fnOperatorList[fnIndex];
            console.log(fnOperator);
            console.log(num1, num2);
            display = operate(fnOperator, num1, num2);
        }
    }

    /* add clicked operators to display */
    else if (operatorList.includes(selectedID)) {
        console.log(selectedID);
        console.log(display);
        // e.target.classList.add('clicked');
        /* if the display is empty, an operator button acts on 0 (e.g., 0/, 0+) */
        if (display == '') {
            display = '0' + e.target.innerHTML;
        }

        else if (operatorList.some(el => display.includes(el))) {
            console.log('here i am');
            if (operatorList.includes(display.slice(-1))) {
                console.log('1 bitch');
                display = display.slice(0, -1) + e.target.innerHTML;
            }
            else {
                console.log('2 bitch');
                console.log(display);
                let inputOperators = operatorList.filter(operator => display.includes(operator));
                operatorIndex = display.indexOf(inputOperators[0]);
                num1 = display.slice(0, operatorIndex);
                num2 = display.slice(operatorIndex + 1);
                let fnIndex = operatorList.indexOf(inputOperators[0]);
                let fnOperator = fnOperatorList[fnIndex];
                console.log(fnOperator);
                console.log(num1, num2);
                display = operate(fnOperator, num1, num2) + e.target.innerHTML;
                console.log(display)
            }
        }

        else {display += e.target.innerHTML};
    }

    /* numbers can just be added to display */
    else {
        display += e.target.innerHTML;
    }

    /* write to the display */ 
    console.log('display type: ' + (typeof display));
    display = display.toString();
    display = display.substring(0, 6);
    document.getElementById("display").innerHTML = display;
}