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

// !!!! BURGER 

const burger = document.querySelector('.header__burger'),
    menu = document.querySelector('.header__menu'),
    headerLinks = document.querySelectorAll('.header__link'),
    body = document.querySelector('body');

function toggleBurger() {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    body.classList.toggle('lock')
}

burger.addEventListener('click', () => {
    toggleBurger();
})

headerLinks.forEach(item => {
    item.addEventListener('click', () => {
        toggleBurger();
    })
});

// !!!! POP UP !!!!

const popUp = document.querySelector('.popup-login'),
    popInner = document.querySelector('.popup-login__content'),
    popBtns = document.querySelectorAll('.pop-trigg'),
    popBody = document.querySelector('.popup-login__body'),
    closeBtns = document.querySelectorAll('.close-popup');


function openPopup() {
    popUp.classList.add('open');
    popInner.classList.add('open');
    body.classList.add('lock-pop');
}
function closePopup() {
    popUp.classList.remove('open');
    popInner.classList.remove('open');
    body.classList.remove('lock-pop');
}

closeBtns.forEach(closeBtnItem => {
    closeBtnItem.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
    });
});

popBody.addEventListener('click', (e) => {
    if (e.target === popBody) {
        closePopup();
    }
});

for (let i = 0; i < popBtns.length; i++) {
    popBtns[i].addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
    })
}



//          !!SPOILERS!!

const spoilers = document.querySelectorAll('.faq__spoiler');

spoilers.forEach(spoiler => {
    spoiler.addEventListener('click', () => {

        // ЕСЛИ НУЖЕН АККОРДИОН, ДОБАВЛЯЕМ ЦИКЛ С ПРОВЕРКОЙ СООТВЕТСВИЯ ЭЛЕМЕНТОВ КЛИКА

        spoilers.forEach(item => {
            if (item != spoiler) {
                item.classList.remove('active')
                item.nextElementSibling.classList.remove('active')
            }
        });
        spoiler.classList.toggle('active');
        spoiler.nextElementSibling.classList.toggle('active');
    });
});

const descSpoilers = document.querySelectorAll('.description__item');

descSpoilers.forEach(item => {
    item.addEventListener('click', () => {
        // for (let i = 0; i < descSpoilers.length; i++) {
        //     if (item != descSpoilers[i]) {
        //         descSpoilers[i].nextElementSibling.classList.remove('active')
        //     }
        // }
        item.nextElementSibling.classList.toggle('active')
    })
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
    calcCurrency()
    parseNum();
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



outputSliderDay.value = rangeSliderDay.value;

rangeSliderDay.oninput = function () {
    outputSliderDay.value = this.value;
    parseNum();
    parseDayValue();
    calcCurrency();
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

//  CALC--SELECTION

const trigSelection = document.querySelector('.calc__spoiler'),
    box = trigSelection.querySelector('.calc__var-box'),
    currencySmall = document.querySelector('.calc__curr-num small'),
    currency = document.querySelector('.calc__currency p'),
    options = document.querySelectorAll('.calc__var');

trigSelection.addEventListener('click', () => {
    trigSelection.classList.toggle('active')
    trigSelection.nextElementSibling.classList.toggle('is-active')
});


// CHANGE CONTENT

options.forEach(item => {
    item.addEventListener('click', (e) => {
        box.innerHTML = item.querySelector('.calc__var-box').innerHTML;
        trigSelection.classList.remove('active');
        trigSelection.nextElementSibling.classList.remove('is-active');
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove('active')
        };
        item.classList.add('active');
        currency.textContent = item.querySelector('p').textContent;
        currencySmall.textContent = item.querySelector('p').textContent;
        calcCurrency();
    })
});


// CHANGE CURRENCY

function calcCurrency() {
    let x = parseInt(rangeSliderTh.value);
    let y = parseInt(rangeSliderDay.value);
    let z = y * x;
    if (currency.textContent == 'BTC') {
        z *= 0.00006515;
    } else if (currency.textContent == 'LTC') {
        z *= 0.00011515;
    } else if (currency.textContent == 'RPL') {
        z *= 0.00012515;
    } else if (currency.textContent == 'ETH') {
        z *= 0.00008515;
    }
    z /= 10;
    currencyNum.textContent = ((z.toFixed(2)) + '');
}



// !!!! OUTPUT NUMERIC RESULT
function parseNum() {
    let day = outputSliderDay.value;
    let outRub = parseInt(day) * calcRubPerTh();
    // SERVICE COUNT
    let percentService = outRub * 0.25;
    // ДОБАВЛЯЕМ РАЗРЯДНОСТЬ ЧИСЛУ ПРИВОДЯ ЕГО К СТРОКЕ, БЕЗ ПРЕВЕДЕНИЯ РАБОТАТЬ НЕ БУДЕТ.
    rubValue.textContent = (Math.round(outRub) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    serviceValue.textContent = (Math.round(percentService) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}