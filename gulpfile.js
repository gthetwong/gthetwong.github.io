var gulp = require('gulp');
var pug = require('gulp-pug');
var runSeq = require('run-sequence');
var deploy = require('gulp-gh-pages');
var destDir = 'build';
var srcPaths = {
	html: 'index.pug',
	styles: 'css/app.css',
	scripts: ['js/**/*.js'],
	assets: 'assets/**/*.*'
};
var destPaths = {
	html: destDir,
	styles: destDir + '/css',
	scripts: destDir + '/js'
};

gulp.task('clean', function() {
	var del = require('del');
	return del(destDir);
});

gulp.task('html', function(){
	gulp.src(['CNAME', 'README.md'])
		.pipe(gulp.dest(destDir));
	return gulp.src(srcPaths.html)
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(destPaths.html));
});

gulp.task('styles', function() {
	var postcss = require('gulp-postcss');
	var cssnext = require('postcss-cssnext');
	var cssmixins = require('postcss-mixins');
	var cssimport = require('postcss-import');
	var cssreporter = require('postcss-reporter');

	var processors = [cssimport(), cssmixins, cssnext(), cssreporter()];
	return gulp.src('css/app.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest(destPaths.styles));
});

gulp.task('bundle', function(cb){
	var Builder = require('systemjs-builder');
	var builder = new Builder('./js/', 'config.js');
	builder.reset();
	builder.buildStatic('index.js', 'build/js/bundle.js', {sourceMaps: 'inline', runtime:false})
	.then(function(){
		console.log('Build Complete');
		cb(null);
	})
	.catch(function(err){
		console.log(err);
	});
});

gulp.task('assets', function(){
	return gulp.src(srcPaths.assets)
	.pipe(gulp.dest(destDir));
});

gulp.task('build', function(cb){
	runSeq('clean', 'html', 'styles', 'bundle', 'assets',  cb);
});

gulp.task('watch', function(){
	gulp.watch(srcPaths.styles, ['styles']);
	gulp.watch(srcPaths.scripts, ['bundle']);
});

gulp.task('serve', ['build'], function(){
	var connect = require('gulp-connect');
	connect.server({
		root: destDir,
		livereload: true
	});
});

gulp.task('deploy', ['build'], function () {
	return gulp.src('build/**/*')
		.pipe(deploy({
			branch: 'master'
		}));
});

// The default task
gulp.task('default', ['serve', 'watch'], function(){});
