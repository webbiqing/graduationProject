/**
 * Created by hand on 2017/3/7.
 */
var gulp = require('gulp');
    minifyCss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    assetRev = require('gulp-asset-rev'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync =require('browser-sync').create(),
    inject = require('gulp-inject');

gulp.task('devIndex', function () {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('app/pages/**/*.js',
            {read: false}),
            {relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('browser-sync',['sass'],function () {
    browserSync.init({
        server: {
            baseDir:'./'          //服务器在这里配置ip
        },
        port: 8000
    });
    gulp.watch('./app/pages/**/*.html').on('change', browserSync.reload);
    gulp.watch('./app/pages/**/*.js').on('change', browserSync.reload);
    gulp.watch(['app/scss/*.scss','app/scss/**/*.scss'],['sass']).on('change', browserSync.reload);
});