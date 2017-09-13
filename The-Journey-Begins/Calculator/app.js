const btns = document.querySelectorAll('.btn');
let realTimeInput = document.querySelector('.realTimeInput');
let result = document.querySelector('.result');
let answer = '';
let log = '';
let = reset = '';
let decimal = true;

function handleClick(e) {
    let entry = e.target.value;
    if (reset) {
        if (entry === '÷' || entry === '×' || entry === '-' || entry === '+') {
            log = answer;
        } else {
            answer = '';
        }
    }

    reset = false;

    if (entry === 'AC') {
        answer = '';
        current = '';
        entry = '';
        log = '';
        realTimeInput.textContent = '';
        result.textContent = '';
        decimal = true;
    }

    if (entry === '.' || entry === '0.') {
        if (!decimal) {
            entry = '';
        }
    }

    if (answer.length === 0 && isNaN(entry) && entry !== '.' || answer.length === 0 && entry === '0') {
        entry = '';
        answer = '';
    }

    while (Number(entry) || entry === '0')
}


btns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});