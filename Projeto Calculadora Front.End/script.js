let display = document.getElementById("display");
let currentInput = "";

function appendNumber(value) {
    currentInput += value;
    display.textContent = currentInput;
}

function appendOperator(operator) {
    if (currentInput === "" || isNaN(currentInput.slice(-1))) return;
    currentInput += operator;
    display.textContent = currentInput;
}

function calculate() {
    try {
        let result = evaluateExpression(currentInput);

        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }

        currentInput = result.toString();
        display.textContent = currentInput;
    } catch (error) {
        display.textContent = "Erro";
        currentInput = "";
    }
}


function evaluateExpression(expression) {
    let tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    if (!tokens) throw new Error("Expressão inválida");

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let num = parseFloat(tokens[i + 1]);

        if (isNaN(num)) throw new Error("Número inválido");

        switch (operator) {
            case "+": result += num; break;
            case "-": result -= num; break;
            case "*": result *= num; break;
            case "/":
                if (num === 0) throw new Error("Divisão por zero!");
                result /= num;
                break;
            default:
                throw new Error("Operação inválida");
        }
    }

    return result;
}

function back() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = "";
    display.textContent = currentInput;
}
