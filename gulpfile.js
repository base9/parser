var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var path = {
  server: './server/index.js',
  serverSideJs: './server/**/*.js',
  test: './test/**/*.js',
}

gulp.task('watch', function() {

});

// TODO: watch out for dev mode vs prod mode
gulp.task('lint', function() {
  return gulp.src([path.serverSideJs])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function () {
  return gulp.src(path.test)
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('mochaWatch', function() {
  return gulp.watch(path.serverSideJs, ['mocha']);
})

gulp.task('expressDev', function() {
  nodemon({
    script: path.server,
  })

  .on('restart', function() {
    console.log('restarted server');
  });
});

/////////////Command-line API////////////////////////////
// $> gulp
gulp.task('default', ['lint', 'watch', 'expressDev']);

// $> gulp test
gulp.task('test', ['mochaWatch', 'mocha']);
