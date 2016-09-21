var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var pug = require('gulp-pug');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssmixins = require('postcss-mixins');
var cssimport = require('postcss-import');
var cssreporter = require('postcss-reporter');
var cssnano = require('cssnano');
var lost = require('lost');
var runSeq = require('run-sequence');
var deploy = require('gulp-gh-pages');
var Builder = require('systemjs-builder');

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

function getFolders(dir) {
	return fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
}

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
	var processors = [cssimport(), cssmixins, cssnext(), lost(), cssreporter(), cssnano({sourceMaps: true, autoprefixer: false})];
	return gulp.src('css/app.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest(destPaths.styles));
});

gulp.task('bundle', function(cb){
	gulp.src(['jspm_packages/system.js', 'config.js'])
	.pipe(gulp.dest('build/'));
	var builder = new Builder('./', 'config.js');
	builder.bundle('js/index.js', 'build/js/bundle.js', {sourceMaps: 'inline', runtime:false})
	.then(function(){
		console.log('Website Build Complete');
		cb(null);
	})
	.catch(function(err){
		console.log(err);
	});
});

gulp.task('projects', function(cb){
	var async = require('async');
	var folders = getFolders('projects/');
	var builder = new Builder('./', 'config.js');
	async.each(folders, function(folder, callback){
		var projectFolder = 'projects/' + folder;
		//transfer project assets
		gulp.src([projectFolder + '/*.*', '!' + projectFolder + '/*.css', '!' + projectFolder + '/*.js'])
			.pipe(gulp.dest('build/' + projectFolder));
		// build project styles
		var processors = [cssimport(), cssmixins, cssnext(), lost(), cssreporter(), cssnano({sourceMaps: true, autoprefixer: false})];
		gulp.src(projectFolder + '/*.css')
			.pipe(postcss(processors))
			.pipe(gulp.dest('build/' + projectFolder));
		// bundle project scripts
		builder.bundle(projectFolder + '/*.js', 'build/' + projectFolder + '/index.js').then(function(){
			console.log('Project: ' + folder + ' – completed');
			callback(null);
		});
	}, function(err){
		if (err)
			cb(err);
		cb(null);
	});
});

gulp.task('assets', function(){
	return gulp.src(srcPaths.assets)
	.pipe(gulp.dest(destDir + '/assets'));
});

gulp.task('build', function(cb){
	runSeq('clean', 'html', 'bundle', 'projects', 'assets', 'styles', cb);
});

gulp.task('watch', function(){
	gulp.watch('css/**', ['styles']);
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
