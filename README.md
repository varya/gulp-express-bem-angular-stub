# Simple project stub with express server and livereload

This is a simple express server flavoried with livereload for the development mode.

## Installation

```
> npm install
```
## Running in development
```
> gulp
```
This provides a development server.
CSS, JavaScript and HTML files are watched in `src` folder and the website is reloaded in case of changes.

## Running app in production
```
> gulp build:app --env=production
> node lib/app/app.js
```