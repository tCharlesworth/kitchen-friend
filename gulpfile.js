//Gulp Needs
var gulp =   require('gulp'),
	concat = require('gulp-concat'),
	sass =   require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    annotate = require('gulp-ng-annotate');

//Tasks
gulp.task('transpileSass', function() {
	console.log('*** transpiling sass');
	return gulp
		.src('./src/www/sass/**/*.scss')
		.pipe(concat('styles.scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest('./src/www/'))
});

gulp.task('concatWWWJs', function() {
	console.log('*** concatinating WWW javascript files');
	return gulp
		.src('./src/www/js/**/*.js')
        .pipe(annotate())
		.pipe(concat('all.js'))
        .pipe(uglify())
		.pipe(gulp.dest('src/www/js/'));
});

//Watch Tasks
gulp.task('default', function() {
    gulp.watch(['./src/**/*'], ['concatWWWJs', 'transpileSass']);
});