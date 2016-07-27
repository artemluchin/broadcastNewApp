'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');


gulp.task('dist.css', function () {
  var sassStream,
      cssStream;
  
  sassStream = gulp.src('src/scss/*.scss')
    .pipe(concat('sass-styles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
	  	browsers: ['last 2 versions'],
	  	cascade: false
	  }))
	  .pipe(rename('styles.css'));
	
	cssStream = gulp.src('src/css/*.css')
	  .pipe(concat('css-styles.css'));
	  
	return merge(cssStream, sassStream)
    .pipe(concat('app.css'))
    .pipe(gulp.dest('broadcast/www/css'));
});

gulp.task('dist.js', function() {
    return gulp.src(['src/js/app.js', 'src/js/*.js'])
        .pipe(concat('app.js'))
		.pipe(gulp.dest('broadcast/www/js'));
});

gulp.task('dist.assets', function() {
    return gulp.src('src/assets/**/*')
      .pipe(gulp.dest('broadcast/www/assets'));
});

gulp.task('dist.lib', function() {
    return gulp.src('src/lib/**/*')
      .pipe(gulp.dest('broadcast/www/lib'));
});

gulp.task('dist.res', function() {
    return gulp.src('src/res/**/*')
      .pipe(gulp.dest('broadcast/www/res'));
});

gulp.task('dist.config', function() {
    return gulp.src('src/config.xml')
      .pipe(gulp.dest('broadcast/'));
});

gulp.task('dist.index', function() {
    return gulp.src('src/index.html')
      .pipe(gulp.dest('broadcast/www/'));
});

gulp.task('dist', ['dist.css', 'dist.js', 'dist.assets', 'dist.lib', 'dist.res', 'dist.config', 'dist.index']);