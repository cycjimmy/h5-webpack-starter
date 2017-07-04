const
  gulp = require('gulp')
  , shell = require('gulp-shell')
  , webpack = require('webpack')
  ;


gulp.task('pack:dev', shell.task([
  'cross-env NODE_ENV=development webpack --config webpack/webpack.dev.config.js --display-modules --display-reasons --display-error-details --watch --color'
]));

gulp.task('pack:build', shell.task([
  'cross-env NODE_ENV=production webpack --config webpack/webpack.build.config.js --progress --display-modules --display-reasons --display-error-details --optimize-minimize --color'
]));

gulp.task('pack:build:watch', shell.task([
  'cross-env NODE_ENV=production webpack --config webpack/webpack.build.config.js --progress --display-modules --display-reasons --display-error-details --optimize-minimize --color --watch'
]));

gulp.task('pack:build:test_server:watch', shell.task([
  'cross-env NODE_ENV=production_test_server webpack --config webpack/webpack.build.config.js --progress --display-error-details --optimize-minimize --color --watch'
]));