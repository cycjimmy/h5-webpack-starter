/**
 * Created by cyc on 16/10/19.
 */

const
  gulp = require('gulp')
  , ghPages = require('gulp-gh-pages')
  ;


// Deploy to ghPages
gulp.task('deploy', () => {
  return gulp.src(srcPaths.build)
    .pipe(ghPages());
});