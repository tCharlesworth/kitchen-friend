//Gulp Needs
var gulp =   require('gulp'),
	concat = require('gulp-concat'),
	sass =   require('gulp-sass'),
	prefix = require('gulp-autoprefixer');

//Tasks
gulp.task('transpileSass', function() {
	console.log('*** transpiling sass');
	return gulp
		.src('./src/www/sass/**/*.scss')
		.pipe(concat('styles.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest('./build/www'))
});

gulp.task('copyHtml', function() {
	console.log('*** copying html files');
	return gulp
		.src('./src/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('concatJs', function() {
	console.log('*** concatinating javascript files');
	return gulp
		.src('./src/www/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('build/www/js/'));
});

//Build Task
gulp.task('build',['concatJs', 'copyHtml', 'transpileSass'], function() {
	console.log('*** Build Complete ***');
});