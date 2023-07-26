const gulp = require('gulp');
//used to minify css file
const cssnano = require('cssnano');
//used in Gulp tasks to append a unique hash to the filenames of static assets such as CSS, JavaScript, and image files.
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

// Task for minimizing CSS files
gulp.task('css', function(done) {
  console.log('minifying css...');

  gulp.src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets'))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

  done();
});

// Task for minimizing JS files
gulp.task('js', function(done) {
  console.log('minifying js...');

  gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

  done();
});

// Task for compressing images
gulp.task('images', function(done) {
  console.log('compressing images...');

  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

  done();
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
