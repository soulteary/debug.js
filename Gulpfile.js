'use strict';

var gulp = require('gulp');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var dirSync = require('gulp-directory-sync');
var uglify = require('gulp-uglify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var lintAll = require('gulp-lint-everything')({jshint : '.jshintrc', jscs : '.jscsrc'});

gulp.task('default', ['demo:sync']);

gulp.task('build', ['script:build'], function() {});

gulp.task('script:build', ['script:copy-lib', 'scripts:compile'], function() {});

// 编译&&压缩脚本
gulp.task('scripts:compile', function() {
    return gulp.src('src/debug.js')
        .pipe(amdOptimize('debug', {wrapShim : true}))
        .pipe(concat('debug.js'))
        .pipe(gulp.dest('dist'))
        .pipe(concat('debug.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 复制依赖的脚本文件
gulp.task('script:copy-lib', function() {
    return gulp.src('./src/js/lib/*.js')
        .pipe(gulp.dest('dist/js/lib'));
});

// 同步输出文件到Demo目录
gulp.task('demo:sync', ['build'], function() {
    return gulp.src('')
        .pipe(dirSync('dist', 'demo/assets', {printSummary : true}))
        .on('error', function(e) {
            console.log(e);
        });
});

// 同步输出文件到Demo目录
gulp.task('test:sync', function() {
    return gulp.src('./dist/debug.min.js')
        .pipe(gulp.dest('test/assets'));
});

// jsLint
gulp.task('scripts:lint', function() {
    return lintAll('./src/**/*.js');
});

// 模拟浏览器测试
gulp.task('test:mocha', ['test:sync'], function() {
    return gulp.src('./test/phantomjs.html').pipe(mochaPhantomJS());
});
