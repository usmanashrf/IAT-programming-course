 const promptSync = require("prompt-sync")();

const ADD = 1;
const SUBTRACT = 2;
const MULTIPLY = 3;
const DIVIDE = 4;


while (true) {
    let first_num_str = promptSync("Enter your first number: ");
    let second_num_str = promptSync("Enter your second number: ");
    let operation_str = promptSync(
        `Select an operation: 1 for addition, 2 for subtraction, 3 for multiplication, 4 for division: `);

    let first_num = parseFloat(first_num_str);
    let second_num = parseFloat(second_num_str);
    let operation = parseInt(operation_str);

    if (isNaN(first_num) || isNaN(second_num) || isNaN(operation)) {
        console.log("Invalid input. Please enter valid numbers and operation.");
        continue;
    }

    if (operation < 1 || operation > 4) {
        console.log("Invalid operation. Please select a valid operation.");
        continue;
    }

    let result;

    switch (operation) {
        case ADD:
            result = first_num + second_num;
            break;
        case SUBTRACT:
            result = first_num - second_num;
            break;
        case MULTIPLY:
            result = first_num * second_num;
            break;
        case DIVIDE:
            if (second_num === 0) {
                console.log("Cannot divide by zero.");
                continue;
            }
            result = first_num / second_num;
            break;
    }

    console.log(`${first_num} ${getOperationSymbol(operation)} ${second_num} = ${result}`);
    break;
}

function getOperationSymbol(operation: number): string {
    switch (operation) {
        case ADD:
            return "+";
        case SUBTRACT:
            return "-";
        case MULTIPLY:
            return "*";
        case DIVIDE:
            return "/";
        default:
            return "";
    }
}
