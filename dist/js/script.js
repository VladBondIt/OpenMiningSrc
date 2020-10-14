// Это не ошибка все ОК


// Функция проверки возможности отображения WEBP
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

//          !!SPOILERS!!

const spoilers = document.querySelectorAll('.faq__spoiler')

spoilers.forEach(spoiler => {
    spoiler.addEventListener('click', (e) => {
        if (e.currentTarget) {
            spoiler.classList.toggle('active')
            spoiler.nextElementSibling.classList.toggle('active')
        }
    });
});

//    !!!CALCULATOR!!!

// CAlC TH VALUE
const outputSliderTh = document.querySelector('.calc__slider-output-th'),
    rangeSliderTh = document.querySelector('.calc__slider-th');


outputSliderTh.value = rangeSliderTh.value;
rangeSliderTh.oninput = function () {
    outputSliderTh.value = this.value
    parseNum();
    calcCurrency();
    parseValue();
};

function parseValue() {
    let x = rangeSliderTh.value;
    let color = `linear-gradient(90deg, #87b645 ${x / 100}%, #fbac00 ${x / 100}%)`;
    rangeSliderTh.style.background = color;
};

outputSliderTh.oninput = function () {
    rangeSliderTh.value = this.value
    parseValue();
    parseNum();
    calcCurrency()
}

// !!! CALC DAYS VALUE

const outputSliderDay = document.querySelector('.calc__slider-output-days'),
    rubValue = document.querySelector('.calc__rub-num p'),
    serviceValue = document.querySelector('.calc__service-num p'),
    currencyNum = document.querySelector('.calc__curr-num p'),
    rangeSliderDay = document.querySelector('.calc__slider-days');

function calcRubPerTh() {
    let x = rangeSliderTh.value;
    // per day
    let y = parseInt(x) * 2;
    return y
}

function calcCurrency() {
    let x = parseInt(rangeSliderTh.value)
    let y = parseInt(rangeSliderDay.value)
    let z = y * x
    z *= 0.00006515
    currencyNum.textContent = ((z.toFixed(2)) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// OUTPUT NUMERIC FUNCTION
function parseNum() {
    let day = outputSliderDay.value;
    let outRub = parseInt(day) * calcRubPerTh();
    // SERVICE COUNT
    let percentService = outRub * 0.25;
    // ДОБАВЛЯЕМ РАЗРЯДНОСТЬ ЧИСЛУ ПРИВОДЯ ЕГО К СТРОКЕ, БЕЗ ПРЕВЕДЕНИЯ РАБОТАТЬ НЕ БУДЕТ.
    rubValue.textContent = (Math.round(outRub) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    serviceValue.textContent = (Math.round(percentService) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}


outputSliderDay.value = rangeSliderDay.value;

rangeSliderDay.oninput = function () {
    outputSliderDay.value = this.value;
    parseNum();
    calcCurrency();
    parseDayValue();
}

outputSliderDay.oninput = function () {
    rangeSliderDay.value = this.value
    parseNum();
    parseDayValue();
    calcCurrency();
}

// CALC PERCENT FOR DAYS RANGE
function parseDayValue() {
    let min = parseInt(rangeSliderDay.getAttribute('min'));
    let max = parseInt(rangeSliderDay.getAttribute('max'));
    let value = parseInt(rangeSliderDay.value);
    let percent = ((value - min) / (max - min)) * 100;
    let color = `linear-gradient(90deg, #87b645 ${percent}%, #fbac00 ${percent}%)`;
    rangeSliderDay.style.background = color;

}

//  CALC SELECTION

const trigSelection = document.querySelector('.calc__spoiler'),
    paragraph = trigSelection.querySelector('p'),
    arrow = trigSelection.querySelector('span'),
    currencySmall = document.querySelector('calc__curr-num'),
    options = document.querySelectorAll('.calc__var');

console.log(currencySmall);

trigSelection.addEventListener('click', () => {
    trigSelection.classList.toggle('active')
    trigSelection.nextElementSibling.classList.toggle('is-active')
});

options.forEach(item => {
    item.addEventListener('click', (e) => {
        paragraph.innerHTML = item.querySelector('p').innerHTML
        trigSelection.appendChild(arrow)
        trigSelection.style.height = 60 + 'px'
        trigSelection.classList.remove('active')
        trigSelection.nextElementSibling.classList.remove('is-active')
        e.currentTarget.classList.add('active')
    })
});