# Project stub with Angular, SASS, BEM CSS and BEM file model

This is a stub project on Angular+SASS. Uses BEM CSS approach and BEM file model. Express server flavoried with
livereload is taken from [gulp-express-stub](https://github.com/varya/gulp-express-stub).

## Installation

```
> npm install
> bower install
```
## Running in development
```
> gulp
```
This provides a development server.
SASS, JavaScript and HTML files are watched in `src` folder and the website is reloaded in case of changes.

## Running app in production
```
> gulp build:app --env=production
> node lib/app/app.js
```
