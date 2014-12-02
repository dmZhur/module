var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var rimraf = require('rimraf');

var version = require('./package.json').version;

var path = {
    src: './src/module.js',
    dist: './dist'
};

gulp.task('lint', function () {
    return gulp.src(path.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['lint'], function () {
    rimraf(path.dist, function () {
        return gulp.src(path.src)
            .pipe(preprocess({context: {VERSION: version}}))
            .pipe(gulp.dest(path.dist))
            .pipe(uglify())
            .pipe(rename('module.min.js'))
            .pipe(gulp.dest(path.dist));
    });
});
