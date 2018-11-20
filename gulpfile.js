/* Подключение пакетов */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

/* Задачи для Gulp */
gulp.task('server', function() {
    browserSync.init({
    	server: { baseDir: "./src/" }
    });

    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

});

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
    	.pipe(plumber({
    		errorHandler: notify.onError(function(err){
    			return {
    				title: 'Styles',
    				message: err.message
    			}
    		})
    	}))
    	.pipe(less())
    	.pipe(gulp.dest('./src/css'))
    	.pipe(browserSync.stream());
});

gulp.task('default', ['server']);