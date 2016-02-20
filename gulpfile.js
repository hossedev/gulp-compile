var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create(),
    concat       = require('gulp-concat'),
    rigger       = require('gulp-rigger');
    var reload      = browserSync.reload;

var src = {
    scss: 'sass/**/*.scss',
    css:  'app/css',
    html: 'app/index.html'
};

// Browser sync + наблюдение за sass и html файлами
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Компиляция sass + миксины бурбон
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(minifycss())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);