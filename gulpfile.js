var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var src = 'dev';
var dest = 'build';

var scripts = '/js/*.js';
var styles = '/css/*.css';

/**
 *  * Push build to gh-pages
 *   */


gulp.task('build', function() {

});

gulp.task('deploy', ['build'] function () {
  return gulp.src("./build/**/*")
    .pipe(deploy({
		branch: 'master'
	}));
});

gulp.task('default', function(){
	var connect = require('gulp-connect');
	connect.server({
		livereload: true
	});
});
