"use strict";

(function() {

var gulp = require("gulp");
var server = require("gulp-express");
var replace = require("gulp-replace");
var util = require("gulp-util");

var sass = require("gulp-sass");
var ngAnnotate = require('gulp-ng-annotate');
var borschik = require("gulp-borschik");

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
    return gulp.src(sourcePath + "/*.sass")
        .pipe(sass(options.sass))
        .pipe(gulp.dest(outputPath));
});

gulp.task("build:js", function() {
    return gulp.src(sourcePath + "/*.js")
        .pipe(ngAnnotate())
        .pipe(borschik({
            minimize: false
        }))
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

    gulp.watch([
        sourcePath + "/**/*.html",
        "!" + sourcePath + "/vendor/**"
        ], ["build:html"]);
    gulp.watch([
        sourcePath + "/**/*.sass",
        "!" + sourcePath + "/vendor/**"
        ], ["build:css"]);
    gulp.watch([
        sourcePath + "/**/*.js",
        "!" + sourcePath + "/vendor/**"
        ], ["build:js"]);

    // liveReload when changes appear
    gulp.watch([
        outputPath + "/**",
        "!" + outputPath + "/vendor/**"
      ], server.notify);
});

gulp.task("default", ["serve"]);

})();
