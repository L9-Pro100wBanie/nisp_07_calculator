// Pobieranie elementów z HTML
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentOperand = '0';
let previousOperand = '';
let currentOperation = null;

// Aktualizacja ekranu
function updateDisplay() {
    display.innerText = currentOperand;
}

// Dodawanie cyfr do ekranu
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        
        // Zabezpieczenie przed wieloma przecinkami
        if (number === '.' && currentOperand.includes('.')) return;
        
        // Zastąpienie zera początkowego, chyba że wpisujemy ułamek
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        updateDisplay();
    });
});

// Wybór operatora (+, -, *, /)
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand === '') return;
        
        // Jeśli już coś liczyliśmy, najpierw wykonaj poprzednie działanie
        if (previousOperand !== '') {
            calculate();
        }
        
        currentOperation = button.getAttribute('data-action');
        previousOperand = currentOperand;
        currentOperand = '';
    });
});

// Główna funkcja licząca (którą powinieneś wrzucać po kawałku na GitHuba!)
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperation) {
        case '+': // Zrób commita na gałęzi feature-add
            computation = prev + current;
            break;
        case '-': // Zrób commita na gałęzi feature-sub
            computation = prev - current;
            break;
        case '*': // Zrób commita na gałęzi feature-mul-div
            computation = prev * current;
            break;
        case '/': // Zrób commita na gałęzi feature-mul-div
            if (current === 0) {
                computation = "Błąd"; // Nie dzielimy przez zero!
            } else {
                computation = prev / current;
            }
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    currentOperation = null;
    previousOperand = '';
    updateDisplay();
}

// Przycisk "="
equalsButton.addEventListener('click', () => {
    calculate();
});

// Przycisk "C" (Czyszczenie)
clearButton.addEventListener('click', () => {
    currentOperand = '0';
    previousOperand = '';
    currentOperation = null;
    updateDisplay();
});