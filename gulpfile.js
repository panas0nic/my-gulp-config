/* Подключение пакетов */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');

/* Задачи для Gulp */
gulp.task('server', function() {
    browserSync.init({
    	server: { baseDir: "./src/" }
    });

    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

});

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
    	.pipe(less())
    	.pipe(gulp.dest('./src/css'));
});

gulp.task('default', ['server']);