let project_folder = 'dist';
let source_folder = '#src';

let fs = require('fs');

let path = {
    // Путь вывода файлов
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    // Исходные файлы
    src: {
        // Делаем исключения для подчеркнутых файлов
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/script.js',
        // ** - Слушаем все подпапки имг, *. имена файлов {расширения файлов} таким образом отсекаем другие файлы
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {
        // Слушаем все файлы html
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + '/'
};

// Устанавливаем и подключаем плагины
let { src, dest, parallel } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    // Есть доп инфа на сайте плагина подключения файлов
    fileinclude = require('gulp-file-include'),
    // Плагин удаления ненужной папки
    del = require('del'),
    // Плагин для обработки препроцессора
    scss = require('gulp-sass'),
    // автопрефиксер
    autoprefixer = require('gulp-autoprefixer'),
    // Крутой плагин собирающий медиа запросы по всей таблице стилей и групgирующий их в один запрос для каждого поинта
    // и помещающий все в футер файла css
    group_media = require('gulp-group-css-media-queries'),
    // Чистит и сжимает файл таблиц стилей
    clean_css = require('gulp-clean-css'),
    // Создание не сжатого файла таблиц
    rename = require('gulp-rename'),
    // Оптимизация JS файла
    uglify = require('gulp-uglify-es').default,
    // Плагин обработки картинок
    imagemin = require('gulp-imagemin'),
    // Конвертирование в формат ВЕБПИ
    webp = require('gulp-webp'),
    // Обработка файла HTNL для формата WEBP
    webphtml = require('gulp-webp-html'),
    // Обработка файда CSS для формата WEBP
    webpCss = require('gulp-webp-css'),
    // Плагин для svg спрайтов
    svgsprite = require('gulp-svg-sprite'),
    // Конвертация шрифтов TTF
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    // Конвертация шрифтов OTF
    fonter = require('gulp-fonter'),
    // Converter WEBP
    webpCon = require('webp-converter');
// Функция обнавления страницы
function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false,
    })
}

// Функция для работы с хтмл файлаими
function html() {
    // Слушаем все html файлы находищиеся в корне соурса
    return src(path.src.html)
        // перенос файла в папку для заказчика. результат
        // сбор файлов в результат
        .pipe(fileinclude())
        // Обработка для WEBP
        .pipe(webphtml())
        // ПАЙП это функция для который мы пишем команды для выполнения галпом
        .pipe(dest(path.build.html))
        // обнавление страницы
        .pipe(browsersync.stream())
}

// Обработка css
function css() {
    // Слушаем все css файлы находищиеся в корне сорса-исходника
    return src(path.src.css)
        .pipe(
            // Указываем настройки
            scss({
                // Не сжимает файл при обработке
                outputStyle: 'expanded'
            })
        )
        .pipe(
            // Без настроек
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        // Функция обработки CSS для WEBP
        .pipe(webpCss())
        // Нужно 2 файла сжатый и нет
        // До того как сожмем и переименуем нужно выгрузить файл
        .pipe(dest(path.build.css))
        // Сжатый
        .pipe(
            clean_css()
        )
        // После сжатия файла будем переиминовывать файл
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        // ПАЙП это функция для который мы пишем команды для выполнения галпом
        .pipe(dest(path.build.css))
        // обнавление страницы
        .pipe(browsersync.stream())
}
// Функция для работы с файлами JavaScript
function js() {
    // Слушаем все js файлы находищиеся в корне соурса
    return src(path.src.js)
        // перенос файла в папку для заказчика. результат
        // сбор файлов в результат
        .pipe(fileinclude())
        // ПАЙП это функция для который мы пишем команды для выполнения галпом
        .pipe(dest(path.build.js))
        // Сжатие файла js
        .pipe(
            uglify()
        )
        // Ренейм по аналогии с CSS файлом
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        // И вставляем js файл еще раз
        .pipe(dest(path.build.js))
        // обнавление страницы
        .pipe(browsersync.stream())
}
// Функция для работы с изображениями
function images() {
    // Слушаем все img файлы находищиеся в корне соурса
    return src(path.src.img)
        // После конвертации в WEBP
        .pipe(
            webp({
                // Качество изображений
                quality: 70
            })
        )
        // Происходит копирование
        .pipe(dest(path.build.img))
        // Опять обрашаемся к исходникам
        .pipe(src(path.src.img))
        // После идет сжатие и копирование
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 3, //От 0 до 7
                svgoPlugins: [
                    {
                        removeViewBox: false
                    }
                ]
            })
        )
        // перенос файла в папку для заказчика. результат
        // ПАЙП это функция для который мы пишем команды для выполнения галпом
        .pipe(dest(path.build.img))
        // обнавление страницы
        .pipe(browsersync.stream())
}
// Функция которая обрабатывает шрифты
function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
};
// Задача вызывающаяся отдельно для плагина svgsprite, редко используемая
// Запуск задачи 2ой терминал gulp svgsprite (галп, имя переменной)
gulp.task('svgsprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg',
                    // Создает html файл с примерами иконок
                    // example: true
                }
            },
        }))
        .pipe(dest(path.build.img))
})
// Задача вызывающаяся отдельно для плагина fonter
// Запуск задачи 2ой терминал gulp fonter галп, имя переменной
gulp.task('fonter', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
})
// Функция импорта шрифтов
// Записывает имена сконвертированых файлов в файл fonts.scss
function fontsStyle() {

    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() { }

// Функция для отлова изменений на лету
function watchFiles() {
    // Путь к файлам которые слушаем, присваем функцию которая совершает изменения
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

// Функция удаления ненужной папки
function clean() {
    return del(path.clean)
}

// Дружим функции с галпом      паралель одновременное выполнение функций
let build = gulp.series(clean, parallel(js, css, html, images, fonts), fontsStyle)
// Сценарий выполнения
let watch = gulp.parallel(build, watchFiles, browserSync);


// запускает переменную вотч с функцией баузер синх

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
