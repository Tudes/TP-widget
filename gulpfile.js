'use strict';

//TODO: Add Gulp-load-plugins
//TODO: Create a config file to store paths
//TODO: Add BrowserSync
//
//TODO: Features Animate CSS Level 3

var gulp = require('gulp'),
	args = require('yargs').argv,
	del = require('del'),
	$ = require('gulp-util'),
	todo = require('gulp-todo'),
	jade = require('gulp-jade'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
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

gulp.task('uglify', function() {
	log('Uglifying vendor libraries');

	return gulp
		.src('./.tmp/vendor/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./.tmp/minify'));
});

gulp.task('concat', function() {
	log('Concatinating vendor libraries');

	return gulp
		.src('./.tmp/minify/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./.tmp/concat'));
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

// function startBrowserSync() {
// 	if (args.nosync || browserSync.active) {
// 		return;
// 	}

// 	log('Starting browser-sync on port ' + port);

// 	gulp.watch(['src/client/styles/style.scss'], ['css'])
// 		.on('change', function(event) {
// 			changeEvent(event); 
// 		});
// 	gulp.watch(['src/client/**/*.jade'], ['jade'])
// 		.on('change', function(event) {
// 			changeEvent(event); 
// 		});

// 	var options = {
// 		proxy: 'localhost:' + port,
// 		port: 3000,
// 		files: [
// 			'./tmp/**/*.*',
// 			'!src/client/styles/style.scss',
// 			'!src/client/**/*.jade',
// 			'./.tmp/style.css'
// 		],
// 		ghostMode: {
// 			clicks: true,
// 			location: false,
// 			forms: true,
// 			scroll: true
// 		},
// 		injectChanges: true,
// 		logFileChanges: true,
// 		logLevel: 'debug',
// 		logPrefix: 'gulp-patterns',
// 		notify: true,
// 		reloadDelay: 1000
// 	};

// 	browserSync(options);
// }

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
