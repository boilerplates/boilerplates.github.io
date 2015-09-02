'use strict';

var assemble = require('assemble');
var deploy = require('gulp-gh-pages');
var connect = require('gulp-connect');
// var reload = require('gulp-livereload');

assemble.task('deploy', function(){
  return assemble.src('_gh_pages/**/*', {dot: true})
    .pipe(deploy({
      branch: 'test'
    }));
});

assemble.task('connect', function () {
  connect.server({
    root: '_gh_pages',
    livereload: true
  });
});

assemble.task('watch', ['site'], function () {
  assemble.watch('src/**/*', ['site']);
});

assemble.task('site', function(){
  return assemble.copy('src/**/*', '_gh_pages', {dot: true})
    .pipe(connect.reload());
});

assemble.task('default', ['site']);
assemble.task('dev', {flow: 'parallel'}, ['connect', 'watch']);
