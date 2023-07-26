const gulp = require('gulp');
const cssnano = require('cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

// Task for minimizing CSS files
gulp.task('css', function() {
  console.log('minifying css...');

  return gulp.src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets'))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

});

// Task for minimizing JS files
gulp.task('js', function() {
  console.log('minifying js...');

  return gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

});

// Task for compressing images
gulp.task('images', function() {
  console.log('compressing images...');

  return gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

});

// Empty the public/assets directory
gulp.task('clean:assets', function(done) {
  // Add cleaning logic if required
  done();
});

// Call the tasks in series
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images', function(done) {
  console.log('Building assets');
  done();
}));
