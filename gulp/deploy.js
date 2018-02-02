const
  gulp = require('gulp')
  , ghPages = require('gh-pages')
;

// Deploy to ghPages
gulp.task('deploy', () => ghPages.publish(srcPaths.build, {
  src: ['**/*']
}, (err) => {
  console.error(err);
}));

