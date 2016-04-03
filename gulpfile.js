(function () {
  'use strict';

  var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    insert = require('gulp-insert'),
    KarmaServer = require('karma').Server,
    src = {
      'scripts': ['./app/javascripts/core-ext/array.js',
                  './app/javascripts/core-ext/object.js',
                 './app/javascripts/lacey_app.js']
    };

  gulp.task('concat', function () {
    return gulp.src(src.scripts)
      .pipe(concat('lacey.js', {
        newLine: '\n'
      }))
      .pipe(insert.append('\n\nwindow.LaceyApp = LaceyApp;'))
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('compress', function () {
    return gulp.src(src.scripts)
      .pipe(concat('lacey.min.js'))
      .pipe(insert.append('\n\nwindow.LaceyApp = LaceyApp;'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('test', function (done) {
    new KarmaServer({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
  });

  gulp.task('tdd', function (done) {
    new KarmaServer({
      configFile: __dirname + '/karma.conf.js'
    }, done).start();
  });

  gulp.task('dist', ['concat', 'compress']);
}());
