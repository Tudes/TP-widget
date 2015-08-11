'use strict';

//TODO: Add Gulp-load-plugins
//TODO: Create a config file to store paths
//TODO: Add BrowserSync
//TODO: Add Autoprefixer
//
//TODO: Features Animate CSS Level 3
//TODO: Features Jade, Gulp, NodeJS/Express, Angular

var gulp = require('gulp'),
	args = require('yargs').argv,
	del = require('del'),
	$ = require('gulp-util'),
	todo = require('gulp-todo'),
	jade = require('gulp-jade'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-ruby-sass');

/**
*
* Jade Task
*
**/

gulp.task('clean-jade', function(cb) {
	log('Clening old HTML files');

	del('./.tmp/**/*.html', cb);
});

gulp.task('jade', ['clean-jade'], function() {
	log('Compiling Jade templates');

	return gulp
		.src('./src/client/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./.tmp'))
});

/**
*
* Sass task
*
**/

gulp.task('clean-css', function(cb) {
	log('Cleaning old CSS files');

	del('./.tmp/**/*.css', cb);
});

// Using autoprefixer since it is up to date with all the specs on Can I Use


gulp.task('css', ['clean-css'], function() {
	log('Compiling SCSS files');

	return sass('./src/client/styles/')
		.on('error', errorLog)
		.pipe(autoprefixer({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest('./.tmp'))
});

/**
*
* Image minification task
*
**/

gulp.task('clean-imagemin', function(cb) {
	log('Cleaning images folder');

	del('./.tmp/images/**/*.*', cb);
});

gulp.task('imagemin', ['clean-imagemin'], function() {
	log('Copying and optimizing images to the distribution folder');

	return gulp
		.src('./src/client/images/**/*.*')
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('./.tmp/images'))
});

// gulp.task('default', function() {
// 	log('Default task ran');
// });

gulp.task('todo', function() {
	log('Generating a to do list');

	return gulp
		.src(['./gulpfile.js'])
		.pipe(todo())
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
	gulp.watch('./src/client/**/*.jade', ['jade']);
	gulp.watch('./src/client/styles/**/*.scss', ['css']);
});

gulp.task('default', ['watch', 'jade', 'css']);

/*==========  helperFunctions  ==========*/

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Log messages functions
// In this example, color green is used when the message is outputed
// Gulp-utils uses an instance of chalk for colors
// Visit this link to find more examples https://raw.githubusercontent.com/chalk/ansi-styles/master/screenshot.png

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.log($.colors.bold.green(msg[item]));
            }
        }
    } else {
        $.log($.colors.bold.green(msg));
    }
}
