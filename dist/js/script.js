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

// CAKC TH VALUE
const outputSlider = document.querySelector('.calc__slider-output-th'),
    rangeSlider = document.querySelector('.calc__slider-th');


outputSlider.value = rangeSlider.value;
rangeSlider.oninput = function () {
    outputSlider.value = this.value
};

function parsValue() {
    let x = rangeSlider.value;
    let color = `linear-gradient(90deg, #87b645 ${x / 100}%, #fbac00 ${x / 100}%)`;
    rangeSlider.style.background = color;
};

outputSlider.oninput = function () {
    rangeSlider.value = this.value
    parsValue();
}

rangeSlider.addEventListener('mousemove', parsValue);

// !!! CALC DAYS VALUE

const outputSliderDay = document.querySelector('.calc__slider-output-days'),
    rangeSliderDay = document.querySelector('.calc__slider-days');

outputSliderDay.value = rangeSliderDay.value
rangeSliderDay.oninput = function () {
    outputSliderDay.value = this.value
}

outputSliderDay.oninput = function () {
    rangeSliderDay.value = this.value
}

function parsDayValue() {
    let x = rangeSliderDay.value
    let y = Math.round(Math.pow((+x / 90 * 3), 2))
    let z = y / 6
    console.log(y);
    let color = `linear-gradient(90deg, #87b645 ${z * 4.7}%, #fbac00 ${z * 4.7}%)`;
    rangeSliderDay.style.background = color;
}

rangeSliderDay.addEventListener('mousemove', parsDayValue)