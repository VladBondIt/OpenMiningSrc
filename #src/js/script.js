// Это не ошибка все ОК
@@include('alert.js')

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