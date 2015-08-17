'use strict'

module.exports = function() {
	var client = './src/client/',
		dist = './dist/',
		root = './',
		tmp = './.tmp/';

	var config = {
		// Folder paths
		client: client,
		dist: dist,
		root: root,
		tmp: tmp,

		// Client paths
		images: client + 'images/**/*.*',
		jade: client + '**/*.jade',
		js: client + 'app/**/*.js',
		sass: client + 'styles/',

		// Temp paths
		css: tmp + 'style.css',
		html: tmp + '**/*.html',
		images_tmp: tmp + 'images/**/*.*',
		module_js: tmp + 'app/**.*.js',
		vendor_js: tmp + 'vendor/*js'

	};

	return config;
}