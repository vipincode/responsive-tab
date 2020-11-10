const { src, dest, series, parallel, watch } = require("gulp");
const del = require('del');
const browserSync = require('browser-sync').create();
const concatenate = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpCopy = require('gulp-copy');

const origin = 'src';
const destination = 'build';
const smartTab= 'node_modules/jquery-smarttab/dist';
sass.compiler = require('node-sass');

const sourceFiles = [
    `${origin}/img/**`,
    `${origin}/fonts/**`,
];

function copyFiles(cb) {
    src(sourceFiles)
   .pipe(gulpCopy(destination, { prefix: 1 }))
   cb();
}

async function clean(cb) {
    await del(destination);
    cb();
}

function html(cb) {
    src(`${origin}/**/*.html`).pipe(dest(destination));
    cb();
}

function css(cb) {
    src([
       `${smartTab}/css/smart_tab_all.css`,
       `${origin}/scss/style.scss`
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(concatenate('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${destination}/css`))
    cb();
}

function js(cb) {
    src([
        `${origin}/js/lib/jquery.js`,
        `${origin}/js/lib/easyResponsiveTabs.js`,
        `${smartTab}/js/jquery.smartTab.js`,
        `${origin}/js/main.js`,
    ])
    .pipe(concatenate('script.js'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${destination}/js`));

    cb();
}

function watcher(cb) {
    watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
    watch(`${origin}/**/*.scss`).on('change', series(css, browserSync.reload))
    watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))

    cb();
}

function server(cb) {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: destination
        }
    })

    cb();
}

exports.default = series(clean, parallel(copyFiles, html, css, js), server, watcher);