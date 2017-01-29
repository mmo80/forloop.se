/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var copy = require('gulp-copy');
var sourcemaps = require('gulp-sourcemaps');


var config = {
    //JavaScript files that will be combined into a jquery bundle
    jquerysrc: [
        'bower_components/jquery/dist/jquery.min.js',
    ],
    jquerybundle: 'scripts/jquery-bundle.min.js',

    appcss: 'assets/styles/forloop.css',
    cssout: 'styles',

    //JavaScript files that will be combined
    appsrc: [
        'assets/scripts/*.js'
    ],
    appbundle: 'scripts/app.min.js'
}


// Synchronously delete the output script file(s)
gulp.task('clean-vendor-scripts', function (cb) {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del([
        config.jquerybundle,
        config.appbundle],
        cb);
});


//Create a jquery bundled file
gulp.task('jquery-bundle', ['clean-vendor-scripts'], function () {
    return gulp.src(config.jquerysrc)
     .pipe(concat('jquery-bundle.min.js'))
     .pipe(gulp.dest('scripts/'));
});


//Create a app bundled file
gulp.task('app-bundle', ['clean-vendor-scripts'], function () {
    return gulp.src(config.appsrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app-min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('scripts/'));
});



// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('vendor-scripts', ['jquery-bundle', 'app-bundle'], function () {

});


// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function (cb) {
    return del([
        config.cssout],
        cb);
});


gulp.task('css', ['clean-styles'], function () {
    return gulp.src([config.appcss])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     //.pipe(concat('app.min.' + getStamp() + '.css'))
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});


// Combine and minify css files
gulp.task('styles', ['css'], function () {

});


//Set a default tasks
gulp.task('default', ['vendor-scripts', 'styles'], function () {

});


gulp.task('watch', function () {
    return gulp.watch(config.appsrc, ['app-bundle']);
});
