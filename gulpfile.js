/* Подключение пакетов */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');



/* Задачи для Gulp */
gulp.task('server', ['scss'], function() {
    browserSync.init({
    	server: { baseDir: "./src/" }
    });

    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    // gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
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
    	.pipe(sourcemaps.init())
    	.pipe(less())
    	.pipe(autoprefixer({
    		browsers: ['last 5 versions'],
    		cascade: false
    	}))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest('./src/css'))
    	.pipe(browserSync.stream());
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
    	.pipe(plumber({
    		errorHandler: notify.onError(function(err){
    			return {
    				title: 'Styles',
    				message: err.message
    			}
    		})
    	}))
    	.pipe(sourcemaps.init())
    	.pipe(scss())
    	.pipe(autoprefixer({
    		browsers: ['last 5 versions'],
    		cascade: false
    	}))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest('./src/css'))
    	.pipe(browserSync.stream());
});

gulp.task('default', ['server']);