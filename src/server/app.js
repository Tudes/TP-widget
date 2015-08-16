'use strict';

var express = require('express'),
	app = express(),
	path = require('path');

var port = process.env.PORT || 8080;
var environment = process.env.NODE_ENV;

console.log('Node server on');
console.log('PORT = ' + port);
console.log('NODE_ENV = ' + environment);

app.listen(port, function() {
	console.log('Express server listening on port ' + port);
	console.log('\n__dirname = ' + __dirname +
				'\n__process.cwd = ' + process.cwd());
});


