var express = require('express');
var livereload = require('connect-livereload');

var environment = process.env.env || "production";

var options = require('../../config');

var app = module.exports.app = exports.app = express();

if (environment === "development") {
    app.use(livereload({
        port: options.livereloadPort
    }));
}

app.use(express.static(options.outputPath));

app.listen(options.port);

console.log('Sever is listening to http://localhost:' + options.port);
