(function () {
  'use strict';

  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    src = {
      'scripts': ['./app/javascripts/core-ext/array.js',
                  './app/javascripts/core-ext/object.js',
                 './app/javascripts/lacey_app.js']
    };

  gulp.task('concat', function () {
    return gulp.src(src.scripts)
      .pipe(concat('lacey.js', {newLine: '\n\n'}))
      .pipe(insert.append('\n\nwindow.LaceyApp = LaceyApp;'))
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('default', function () {});
}());
