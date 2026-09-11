class Calculator {
    constructor() {
        this.display = document.getElementById('calcDisplay');
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.history = this.loadHistory();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
        this.renderHistory();
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.number);
            });
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setOperator(e.target.dataset.operator);
            });
        });

        // Function buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'clear') this.clear();
                else if (action === 'backspace') this.backspace();
                else if (action === 'toggleSign') this.toggleSign();
                else if (action === 'equals') this.calculate();
            });
        });

        // Clear history button
        document.getElementById('clearHistory').addEventListener('click', () => {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (/\d/.test(e.key)) this.inputNumber(e.key);
            if (e.key === '+') this.setOperator('+');
            if (e.key === '-') this.setOperator('-');
            if (e.key === '*') this.setOperator('*');
            if (e.key === '/') {
                e.preventDefault();
                this.setOperator('/');
            }
            if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculate();
            }
            if (e.key === 'Backspace') this.backspace();
            if (e.key === 'Escape') this.clear();
            if (e.key === '.') this.inputNumber('.');
        });
    }

    inputNumber(num) {
        if (num === '.' && this.currentValue.includes('.')) return;

        if (this.shouldResetDisplay) {
            this.currentValue = num === '.' ? '0.' : num;
            this.shouldResetDisplay = false;
        } else {
            this.currentValue = this.currentValue === '0' && num !== '.' 
                ? num 
                : this.currentValue + num;
        }

        this.render();
    }

    setOperator(op) {
        if (this.operator !== null) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operator = op;
        this.shouldResetDisplay = true;
        this.render();
    }

    calculate() {
        if (this.operator === null || this.shouldResetDisplay) return;

        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        let result;

        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current === 0 ? 'Error' : prev / current;
                break;
            default:
                return;
        }

        // Round to avoid floating point errors
        if (typeof result === 'number') {
            result = Math.round(result * 100000000) / 100000000;
        }

        // Add to history
        if (typeof result === 'number') {
            this.addToHistory(`${this.previousValue} ${this.getOperatorSymbol()} ${this.currentValue}`, result);
        }

        this.currentValue = result.toString();
        this.operator = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.render();
    }

    getOperatorSymbol() {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        };
        return symbols[this.operator] || this.operator;
    }

    backspace() {
        if (this.shouldResetDisplay) return;
        
        this.currentValue = this.currentValue.length === 1 
            ? '0' 
            : this.currentValue.slice(0, -1);
        this.render();
    }

    toggleSign() {
        const num = parseFloat(this.currentValue);
        this.currentValue = (num * -1).toString();
        this.render();
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.render();
    }

    addToHistory(calculation, result) {
        this.history.unshift({
            calculation,
            result: typeof result === 'number' ? result.toFixed(6).replace(/\.?0+$/, '') : result,
            timestamp: new Date().toLocaleTimeString()
        });

        // Keep only last 20 calculations
        if (this.history.length > 20) {
            this.history.pop();
        }

        this.saveHistory();
        this.renderHistory();
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        return saved ? JSON.parse(saved) : [];
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
            return;
        }

        historyList.innerHTML = this.history.map((item, index) => `
            <div class="history-item" onclick="calculator.useHistoryItem(${index})">
                <span class="history-calculation">${item.calculation}</span>
                <span class="history-result">${item.result}</span>
            </div>
        `).join('');
    }

    useHistoryItem(index) {
        this.currentValue = this.history[index].result;
        this.shouldResetDisplay = true;
        this.render();
    }

    render() {
        this.display.value = this.currentValue;
    }
}

// Initialize calculator
const calculator = new Calculator();
