/**
 * Lab 7: Mathematical Calculations
 * Core JavaScript Logic for Arithmetic Operations
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('calculatorForm');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationDropdown = document.getElementById('operationDropdown');
    const operatorButtons = document.querySelectorAll('.op-btn');
    const resultField = document.getElementById('resultField');
    const resultEquation = document.getElementById('resultEquation');
    const calculationTime = document.getElementById('calculationTime');
    const alertBox = document.getElementById('alertBox');
    const alertIcon = document.getElementById('alertIcon');
    const alertMessage = document.getElementById('alertMessage');
    const btnSwap = document.getElementById('btnSwap');
    const btnNegate1 = document.getElementById('btnNegate1');
    const btnNegate2 = document.getElementById('btnNegate2');
    const btnReset = document.getElementById('btnReset');
    const btnCopyResult = document.getElementById('btnCopyResult');
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    const presetChips = document.querySelectorAll('.preset-chip');
    const historyList = document.getElementById('historyList');
    const emptyHistoryNotice = document.getElementById('emptyHistoryNotice');
    const historyCount = document.getElementById('historyCount');
    const btnClearHistory = document.getElementById('btnClearHistory');

    // Operator symbols mapping
    const operatorSymbols = {
        add: '+',
        subtract: '−',
        multiply: '×',
        divide: '÷',
        modulus: '%',
        power: '^'
    };

    // Calculation History State
    let history = [];

    // =========================================================================
    // 1. Operator Selection & Synchronization (Buttons <-> Dropdown)
    // =========================================================================
    function setActiveOperator(opName) {
        // Update dropdown
        operationDropdown.value = opName;

        // Update visual buttons
        operatorButtons.forEach(btn => {
            if (btn.dataset.op === opName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Button click triggers selection
    operatorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveOperator(btn.dataset.op);
            hideAlert();
        });
    });

    // Dropdown change triggers selection
    operationDropdown.addEventListener('change', (e) => {
        setActiveOperator(e.target.value);
        hideAlert();
    });

    // =========================================================================
    // 2. Alert / Status Notification System
    // =========================================================================
    function showAlert(type, message) {
        alertBox.className = `alert-box ${type}`;
        alertMessage.textContent = message;
        if (type === 'danger') {
            alertIcon.innerHTML = '&#9888;'; // Warning sign
        } else if (type === 'warning') {
            alertIcon.innerHTML = '&#9888;';
        } else {
            alertIcon.innerHTML = '&#10004;'; // Checkmark
        }
        alertBox.classList.remove('hidden');
    }

    function hideAlert() {
        alertBox.classList.add('hidden');
    }

    // =========================================================================
    // 3. Mathematical Calculations Core Function
    // =========================================================================
    function performCalculation() {
        hideAlert();

        const raw1 = num1Input.value.trim();
        const raw2 = num2Input.value.trim();

        // Validation: Empty inputs
        if (raw1 === '' || raw2 === '') {
            showAlert('warning', 'Please enter valid numbers in both operand fields.');
            if (raw1 === '') num1Input.focus();
            else num2Input.focus();
            return false;
        }

        const n1 = parseFloat(raw1);
        const n2 = parseFloat(raw2);

        // Validation: NaN check
        if (isNaN(n1) || isNaN(n2)) {
            showAlert('danger', 'Invalid numeric input encountered. Please provide real numbers.');
            return false;
        }

        const op = operationDropdown.value;
        const symbol = operatorSymbols[op] || '+';
        let result = null;
        let isError = false;

        switch (op) {
            case 'add':
                result = n1 + n2;
                break;

            case 'subtract':
                result = n1 - n2;
                break;

            case 'multiply':
                result = n1 * n2;
                break;

            case 'divide':
                if (n2 === 0) {
                    showAlert('danger', 'Error: Division by zero is mathematically undefined!');
                    resultField.value = 'Undefined (÷ 0)';
                    resultEquation.textContent = `${n1} ÷ 0 = Undefined`;
                    calculationTime.textContent = 'Division by zero attempted';
                    isError = true;
                    return false;
                }
                result = n1 / n2;
                break;

            case 'modulus':
                if (n2 === 0) {
                    showAlert('danger', 'Error: Modulo by zero is undefined!');
                    resultField.value = 'Undefined (% 0)';
                    resultEquation.textContent = `${n1} % 0 = Undefined`;
                    isError = true;
                    return false;
                }
                result = n1 % n2;
                break;

            case 'power':
                result = Math.pow(n1, n2);
                if (isNaN(result) || !isFinite(result)) {
                    showAlert('warning', 'Result is undefined or exceeds JavaScript numeric capacity.');
                    resultField.value = 'Out of range';
                    return false;
                }
                break;

            default:
                result = n1 + n2;
        }

        // Float precision cleanup: round to at most 8 decimal places to eliminate IEEE floating point quirks (e.g. 0.1 + 0.2)
        const cleanResult = cleanFloat(result);

        // Update Result Display
        resultField.value = cleanResult;
        resultEquation.textContent = `${n1} ${symbol} ${n2} = ${cleanResult}`;
        const now = new Date();
        calculationTime.textContent = `Calculated at ${now.toLocaleTimeString()}`;

        // Add to history
        addToHistory({
            n1: n1,
            n2: n2,
            op: op,
            symbol: symbol,
            result: cleanResult,
            time: now.toLocaleTimeString()
        });

        return true;
    }

    /**
     * Cleans IEEE floating-point arithmetic errors
     */
    function cleanFloat(value) {
        if (!Number.isFinite(value)) return String(value);
        // Format to max 8 decimals and parse back to strip trailing zeroes
        const rounded = parseFloat(value.toFixed(8));
        return String(rounded);
    }

    // =========================================================================
    // 4. History Management
    // =========================================================================
    function addToHistory(item) {
        history.unshift(item); // insert at front
        if (history.length > 15) history.pop(); // keep last 15
        renderHistory();
    }

    function renderHistory() {
        historyCount.textContent = history.length;

        if (history.length === 0) {
            emptyHistoryNotice.style.display = 'block';
            historyList.innerHTML = '';
            historyList.appendChild(emptyHistoryNotice);
            return;
        }

        emptyHistoryNotice.style.display = 'none';
        historyList.innerHTML = '';

        history.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'history-item';
            row.title = 'Click to reload this calculation';
            row.innerHTML = `
                <div class="history-expr">${item.n1} ${item.symbol} ${item.n2}</div>
                <div class="history-val">= ${item.result}</div>
            `;
            row.addEventListener('click', () => {
                num1Input.value = item.n1;
                num2Input.value = item.n2;
                setActiveOperator(item.op);
                performCalculation();
            });
            historyList.appendChild(row);
        });
    }

    btnClearHistory.addEventListener('click', () => {
        history = [];
        renderHistory();
    });

    // =========================================================================
    // 5. Utility Handlers (Swap, Negate, Reset, Copy)
    // =========================================================================

    // Swap Operands
    btnSwap.addEventListener('click', () => {
        const temp = num1Input.value;
        num1Input.value = num2Input.value;
        num2Input.value = temp;
        if (num1Input.value !== '' && num2Input.value !== '') {
            performCalculation();
        }
    });

    // Negate Number 1
    btnNegate1.addEventListener('click', () => {
        if (num1Input.value !== '') {
            num1Input.value = parseFloat(num1Input.value) * -1;
            if (num2Input.value !== '') performCalculation();
        }
    });

    // Negate Number 2
    btnNegate2.addEventListener('click', () => {
        if (num2Input.value !== '') {
            num2Input.value = parseFloat(num2Input.value) * -1;
            if (num1Input.value !== '') performCalculation();
        }
    });

    // Reset Form
    btnReset.addEventListener('click', () => {
        form.reset();
        setActiveOperator('add');
        resultField.value = '—';
        resultEquation.textContent = 'Formula: —';
        calculationTime.textContent = 'Form reset';
        hideAlert();
        num1Input.focus();
    });

    // Copy Result to Clipboard
    btnCopyResult.addEventListener('click', () => {
        const val = resultField.value;
        if (val && val !== '—' && !val.includes('Undefined')) {
            navigator.clipboard.writeText(val).then(() => {
                btnCopyResult.classList.add('copied');
                copyText.textContent = 'Copied!';
                copyIcon.innerHTML = '&#10004;';
                setTimeout(() => {
                    btnCopyResult.classList.remove('copied');
                    copyText.textContent = 'Copy Result';
                    copyIcon.innerHTML = '&#128203;';
                }, 1800);
            }).catch(() => {
                // Fallback selection copy
                resultField.select();
                document.execCommand('copy');
            });
        }
    });

    // Quick Test Preset Chips
    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            num1Input.value = chip.dataset.n1;
            num2Input.value = chip.dataset.n2;
            setActiveOperator(chip.dataset.op);
            performCalculation();
        });
    });

    // Form Submit Event
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        performCalculation();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            btnReset.click();
        }
    });

    // Clear alert when user starts typing
    [num1Input, num2Input].forEach(inp => {
        inp.addEventListener('input', () => {
            if (!alertBox.classList.contains('hidden')) {
                hideAlert();
            }
        });
    });

    // Initial focus
    num1Input.focus();
});
