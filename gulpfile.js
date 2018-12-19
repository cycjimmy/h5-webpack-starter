const
  gulp = require('gulp')
  , webpackTasks = require('./gulp/webpack')
  , svgstoreTasks = require('./gulp/svgstore')
  , deployTasks = require('./gulp/deploy')
;

// srcPaths
global.srcPaths = {
  icons: {                             // icons
    from: 'static/icons/',
    to: 'static/images/icons/',
  },
  build: 'build',                     // Eventually export
  node_modules: "node_modules"         // Node dependent packages
};

// task
gulp.task('svgstore', svgstoreTasks.svgstore);
gulp.task('build', webpackTasks.packBuild);
gulp.task('build:watch', webpackTasks.packBuildWatch);
gulp.task('build:test_server:watch', webpackTasks.packBuildTestServerWatch);
gulp.task('deploy', deployTasks.deploy);

// default task
gulp.task('default', webpackTasks.packDev);

