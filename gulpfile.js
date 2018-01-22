// Requirement for autoprefixer
require('es6-promise').polyfill();

// Requires
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Stylesheets
gulp.task('sass', () => {
  return gulp.src('src/styles/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream())
});

// Minify JS
gulp.task('js', () => {
  gulp.src('src/js/*.js')
      .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

// Vendor Concat
gulp.task('vendor', () => {
  return gulp.src('src/js/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/vendor/'));
});

// Image Minify
gulp.task('images', () => {
  return gulp.src('src/img/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

//Watcher
gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']).on('change', reload);
  gulp.watch('src/js/vendor/*.js', ['vendor']).on('change', reload);
  gulp.watch('src/img/*.+(png|jpg|gif|svg)', ['images']).on('change', reload);
});

// Browsersync
gulp.task('serve', () => {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    },
    tunnel: false // True for unique testing link
  });

  gulp.watch("*.html").on("change", reload);
});

// Run tasks on 'gulp'
gulp.task('default', ['sass', 'js', 'vendor', 'watch', 'serve', 'images']);