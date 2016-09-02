const gulp = require('gulp');
const del = require('del');
const path = require('path');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const webpackConfig = require('./webpack.config.js');

const paths = {
  'jsApp': 'www/js/bootstrap.js',
  'jsBundleName': 'app-bundle.js',
  'jsBundleDir': 'www/js/',
  'templates': 'www/app-templates.html',
  'lessBundle': 'www/styles/bundle.less',
  'lessBundleDir': 'www/styles'
}

gulp.task('clear:templates', () => {
  return del([paths.templates]);
});

gulp.task('clear:js', () => {
  var bundlePath = path.join(paths.jsBundleDir, paths.jsBundleName);
  var mapPath = path.join(paths.jsBundleDir, '*.map');
  return del([bundlePath, mapPath]);
});

gulp.task('build:js', ['clear:js'], () => {
  return gulp.src([paths.jsApp])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.jsBundleDir));
});

gulp.task('build:styles', () => {
  return gulp.src(paths.lessBundle)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.lessBundleDir));
});

gulp.task('build', ['build:js', 'build:styles', 'clear:templates'], (next) => {
  next();
});

gulp.task('default', ['build'], (next) => {
  next();
});
