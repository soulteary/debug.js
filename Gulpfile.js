var gulp = require('gulp');

var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var path = require('path');
var rename = require("gulp-rename");
var dirSync = require('gulp-directory-sync');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);

gulp.task("build", ["script:build"], function () {});
gulp.task("script:build", ["script:copy-lib","scripts:minify"], function () {});

// 编译脚本
gulp.task("scripts:compile", function () {
    return gulp.src("src/debug.js")
        .pipe(amdOptimize("debug", {wrapShim: true}))
        .pipe(concat("debug.js"))
        .pipe(gulp.dest("dist"));
});
gulp.task("scripts:minify", ["scripts:compile"], function () {
    return gulp.src("dist/debug.js")
        .pipe(concat("debug.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

// 复制依赖的脚本文件
gulp.task("script:copy-lib", function () {
    return gulp.src("./src/js/lib/*.js")
        .pipe(gulp.dest("dist/js/lib"));
});

// 同步输出文件到Demo目录
gulp.task("demo:sync", function () {
    gulp.src('')
        .pipe(dirSync("src/html", 'demo', {printSummary: true}))
        .pipe(dirSync("dist", 'demo/assets', {printSummary: true}))
        .on('error', function (e) {
            console.log(e);
        });
});
