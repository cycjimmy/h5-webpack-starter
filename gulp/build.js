/**
 * Created by cyc on 16/10/19.
 */

const
  gulp = require('gulp')
  , runSequence = require('run-sequence')
  ;

// Build task
gulp.task('build', callback=> {
  runSequence('pack:build',
    callback
  )
});