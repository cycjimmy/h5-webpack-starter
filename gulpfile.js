/**
 * Created by cycjimmy on 2016/7/13.
 */

const
  requireDir = require('require-dir')
  , gulp = require('gulp')
  , runSequence = require('run-sequence')
  ;

// srcPaths
global.srcPaths = {
  icons: {                             // icons
    from: 'static/icons/',
    to: 'static/images/icons/',
  },
  build : 'build/**/*',                // Eventually export
  node_modules: "node_modules"         // Node dependent packages
};


// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {
  recurse: false
});

// default task
gulp.task('default', callback => {
  runSequence('pack:dev',
    callback
  );
});





