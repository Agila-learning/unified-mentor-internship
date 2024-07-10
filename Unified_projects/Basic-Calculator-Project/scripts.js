function clearResult() {
    document.getElementById('result').value = '';
}

function deleteLast() {
    let result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}

function appendNumber(number) {
    document.getElementById('result').value += number;
}

function appendOperator(operator) {
    document.getElementById('result').value += ' ' + operator + ' ';
}

function appendDot() {
    let result = document.getElementById('result').value;
    if (!result.endsWith('.')) {
        document.getElementById('result').value += '.';
    }
}

function calculateResult() {
    try {
        let result = document.getElementById('result').value;
        let evaluatedResult = evaluateExpression(result);
        if (evaluatedResult === Infinity || isNaN(evaluatedResult)) {
            throw new Error('Math Error');
        }
        document.getElementById('result').value = evaluatedResult;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function calculateSquareRoot() {
    try {
        let result = document.getElementById('result').value;
        let evaluatedResult = Math.sqrt(evaluateExpression(result));
        if (isNaN(evaluatedResult)) {
            throw new Error('Math Error');
        }
        document.getElementById('result').value = evaluatedResult;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function calculatePercentage() {
    try {
        let result = document.getElementById('result').value;
        let evaluatedResult = evaluateExpression(result) / 100;
        document.getElementById('result').value = evaluatedResult;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function evaluateExpression(expression) {
    // Split the expression into tokens
    let tokens = expression.split(' ').filter(token => token !== '');
    let values = [];
    let operators = [];
    
    let precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    let applyOperator = function(operators, values) {
        let operator = operators.pop();
        let b = values.pop();
        let a = values.pop();
        switch (operator) {
            case '+': values.push(a + b); break;
            case '-': values.push(a - b); break;
            case '*': values.push(a * b); break;
            case '/': 
                if (b === 0) {
                    throw new Error('Math Error');
                }
                values.push(a / b); break;
        }
    };

    for (let token of tokens) {
        if (!isNaN(token)) {
            // If token is a number, push it to the values stack
            values.push(parseFloat(token));
        } else if (token in precedence) {
            // If token is an operator, handle operator precedence
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                applyOperator(operators, values);
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        applyOperator(operators, values);
    }

    return values[0];
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDot();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearResult();
    }
});
