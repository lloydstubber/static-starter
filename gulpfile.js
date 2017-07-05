// Requirement for autoprefixer
require('es6-promise').polyfill();

// Requires
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Stylesheets
gulp.task('sass', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
});

//Watcher
gulp.task('watch', function(){
  gulp.watch('src/styles/*.scss', ['sass']);
});

// Image Minify
gulp.task('images', function(){
  return gulp.src('src/img/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
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
gulp.task('default', ['sass', 'watch', 'serve', 'images']);