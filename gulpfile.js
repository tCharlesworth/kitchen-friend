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
		.pipe(gulp.dest('./build/www/'))
});

gulp.task('copyHtml', function() {
	console.log('*** copying html files');
	return gulp
		.src('./src/**/*.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('concatWWWJs', function() {
	console.log('*** concatinating WWW javascript files');
	return gulp
		.src('./src/www/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('build/www/js/'));
});

gulp.task('concatServerJs', function() {
    console.log('*** concatinating Server javascript files');
    return gulp
        .src('./src/server/**/*.js')
        // .pipe(concat('server.js'))
        .pipe(gulp.dest('build/'));
});

//Watch Tasks
gulp.task('Watch', function() {
    gulp.watch(['./src/**/*'], ['build']);
});

//Build Task
gulp.task('build',['concatWWWJs', 'copyHtml', 'transpileSass', 'concatServerJs'], function() {
	console.log('*** Build Complete ***');
});