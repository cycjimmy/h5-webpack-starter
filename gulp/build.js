const
  gulp = require('gulp')
  , runSequence = require('run-sequence')
;

// Build task
gulp.task('build', callback => {
  runSequence('pack:build',
    callback
  )
});