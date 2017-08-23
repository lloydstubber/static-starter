// Requirement for autoprefixer
require('es6-promise').polyfill();

// Requires
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Stylesheets
gulp.task('sass', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
});

// Minify JS
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Image Minify
gulp.task('images', function(){
  return gulp.src('src/img/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

//Watcher
gulp.task('watch', function(){
    gulp.watch('src/styles/*.scss', ['sass']).on('change', reload);
    gulp.watch('src/js/*.js', ['js']).on('change', reload);
    gulp.watch('src/img/*.+(png|jpg|gif|svg)', ['images']).on('change', reload);
});

// Browsersync
gulp.task('serve', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", reload);
});

// Run tasks on 'gulp'
gulp.task('default', ['sass', 'js', 'watch', 'serve', 'images']);
