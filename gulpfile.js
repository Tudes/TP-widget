'use strict';

//TODO: Add Gulp-load-plugins
//TODO: Add BrowserSync
//
//TODO: Features Animate CSS Level 3
//TODO: Plugins to be added - htmlmin, cssmin, 

var gulp = require('gulp'),
	args = require('yargs').argv,
	del = require('del'),
	$ = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-ruby-sass'),

	plugins = require('gulp-load-plugins')({lazy: true}),
	config = require('./config')();

/**
*
* Jade Task
*
**/

gulp.task('clean-jade', function(cb) {
	log('Clening old HTML files');

	del(config.html, cb);
});

gulp.task('jade', ['clean-jade'], function() {
	log('Compiling Jade templates');

	return gulp
		.src(config.jade)
		.pipe(plugins.jade({
			pretty: true
		}))
		.pipe(gulp.dest(config.tmp))
});

gulp.task('uglify', function() {
	log('Uglifying vendor libraries');

	return gulp
		.src(config.js)
		.pipe(uglify())
		.pipe(gulp.dest('./.tmp/**/*.js'));
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

	del(config.css, cb);
});

// Using autoprefixer since it is up to date with all the specs on Can I Use

// It looks like the Gulp-ruby-sass plugin is more active in terms of commits

gulp.task('css', ['clean-css'], function() {
	log('Compiling SCSS files');

	return sass(config.sass)
		.on('error', errorLog)
		.pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest(config.tmp))
});

gulp.task('clean-js', function(cb) {
	log('Cleaning old AngularJS files');

	del(config.module_js, cb);
})

/**
*
* Image minification task
*
**/

gulp.task('clean-imagemin', function(cb) {
	log('Cleaning images folder');

	del(config.images_tmp, cb);
});

gulp.task('imagemin', ['clean-imagemin'], function() {
	log('Copying and optimizing images to the distribution folder');

	return gulp
		.src(config.images)
		.pipe(plugins.imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('./.tmp/images'))
});

gulp.task('todo', function() {
	log('Generating a to do list');

	return gulp
		.src(['./gulpfile.js'])
		.pipe(plugins.todo())
		.pipe(gulp.dest(config.root))
});

gulp.task('watch', function() {
	gulp.watch(config.jade, ['jade']);
	gulp.watch(config.sass + '**/*.scss', ['css']);
});

gulp.task('default', ['watch', 'jade', 'css', 'todo']);

gulp.task('build', []);

/*==========  helperFunctions  ==========*/

// function startBrowserSync() {
// 	if (args.nosync || browserSync.active) {
// 		return;
// 	}

// 	log('Starting browser-sync on port ' + port);

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
