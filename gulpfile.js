"use strict";

(function() {

var gulp = require("gulp");
var server = require("gulp-express");
var replace = require("gulp-replace");
var util = require("gulp-util");

var options = require("./config");

// Shortcats
var sourcePath = options.sourcePath;
var outputPath = options.outputPath;
var appPath = options.appPath;
var livereloadPort = options.livereloadPort;

var environment = util.env.env || 'development';

gulp.task("build:app", [
    "build:html",
    "build:css",
    "build:js"
    ]);

gulp.task("build:css", function() {
    return gulp.src(sourcePath + "/*.css")
        // Add your building for CSS here
        .pipe(gulp.dest(outputPath));
});

gulp.task("build:js", function() {
    return gulp.src(sourcePath + "/*.js")
        // Add your building for JS here
        .pipe(gulp.dest(outputPath));
});

gulp.task("build:html", function() {

    var livereloadScript = {
        "production": "",
        "development": "<script src='http://localhost:" + livereloadPort + "/livereload.js'></script>"
    }
    // Copy HTML
    return gulp.src(sourcePath + "/**/*.html")
        .pipe(replace("<!-- livereload -->", livereloadScript[environment]))
        .pipe(gulp.dest(outputPath));

});

gulp.task("serve", ["build:app"], function() {
    server.run([
        appPath
    ], {
      env: {
          env: environment
      }
    });

    gulp.watch(sourcePath + "/**/*.html", ["build:html"]);
    gulp.watch(sourcePath + "/**/*.css", ["build:css"]);
    gulp.watch(sourcePath + "/**/*.js", ["build:js"]);

    // liveReload when changes appear
    gulp.watch(outputPath + '/**', server.notify);
});

gulp.task("default", ["serve"]);

})();
